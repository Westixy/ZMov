const { Cu } = require("chrome");
const { TextDecoder, TextEncoder, OS } = Cu.import("resource://gre/modules/osfile.jsm", {});
//var tabs = require("sdk/tabs");
var self = require("sdk/self");
var ui = require("sdk/ui");
var { setTimeout } = require("sdk/timers");

var urlBase = "http://maw.dev/interface";
var defaultExt = ["mp4", "avi", "mkv", "dvx", "mov", "mpg", "mpa", "asf", "wma", "vob", "wmv"];
var ConfigPath = "data/config.json";
var debug=console.log;
var exec = require("sdk/system/child_process").exec;

var version="1.0.1";

// TODO DEBUG THIS SHIT

function Extention(){
  var that = this;

  this.fm=new FolderManager();

  this.web=[]; // workers for web

  /*
  ====================
         EVENTS
  ====================
  */
  this.initEvents=function(){
    var tabs = require("sdk/tabs");

    tabs.on('load',that.tabsOnReady);
    //tabs.on('ready',function(tab){console.log('ready '+tab.title);})    });
    //tabs.on('ready', that.tabsOnReady);
  }

  // vvv TABS EVENTS vvv //
  this.tabsOnReady=function(tab){
    if(tab.window.title.indexOf("ZMov app")>=0){
      that.webAttach(tab);
    }
  }

  // vv Workers EVENTS vvv //
  this.setWorkerEvents=function(wkr){
    debug=function(some){wkr.port.emit('DEBUG',some)};
    wkr.port.on('fopen',Extention.fopen);
    wkr.port.on('flist_set',that.fm.set);
    wkr.port.on('flist_get',that.actualiseAndEmit);
    wkr.port.on('ext_set',function(ext){defaultExt=ext;});
    wkr.port.on('sync_get',function(){
      wkr.port.emit('sync_ok',version)
    });
    wkr.port.on('DEBUG',function(args){
      debug(args);
    });
  }

  /*
  ====================
          UTILS
  ====================
  */
  this.webAttach=function(tab){
    var wkr = tab.attach({
      contentScriptFile: [self.data.url("comm.js"),self.data.url("web.js")]
    });
    that.web.push(wkr);
    that.setWorkerEvents(wkr);
  }

  this.actualiseAndEmit=function(){
    that.fm.readAll(function(){
      that.wemit('flist_ok',that.fm.files);
    });
  }

  // Alias
  this.wemit=function(action,vars){
    for(var i=0; i<that.web.length ; i++){
      that.web[i].port.emit(action,vars);
    }
  }

}
Extention.startWith=function(pattern,text){
  return (text.substring(0, pattern.length) == pattern);
}
Extention.fopen=function(path){
  debug(path);
  console.log("FOPEN => <"+path+">");
  // for unix
  require('chrome').Cu.import('resource://gre/modules/FileUtils.jsm');
  new FileUtils.File(path).launch();
}

function FolderManager(){
  var that=this;

  this.folders=[];
  this.files=[];

  this.add=function(path){
    if(that.folders.indexOf(path)<0){
      that.folders.push(path);
    }
  }

  this.remove=function(path){
    var index = that.folders.indexOf(path);
    if (index>=0){that.folder.splice(index,1);}
  }

  this.set=function(foldArray){
    that.folders=foldArray;
  }
  this.foreach=function(func){
    for(var i=0; i<that.folders.length;i++){
      func(that.folders[i],i);
    }
  }
  this.readOne=function(path, callback) {
      var gfc = new getFolderContent(path);

      gfc.onEnd = function() {
          that.files = that.files.concat(gfc.content.files);
          callback();
      };
      gfc.readdir();
  }
  this.readAll=function(callback) {
    var folderOk = 0;
    that.foreach(function(entry){
      that.readOne(entry,function(){
        folderOk++;
        if (folderOk >= that.folders.length) {
          callback();
        }
      });
    });
  }
}
FolderManager.foldEquals=function(fold1,fold2){
  let fold1L = fold1.substring(fold1.length - 1, fold1.length)
  if (fold1L == "/" || fold1L == "\\") fold1 = fold1.substring(0, fold1.length - 1);
  let fold2L = fold2.substring(fold2.length - 1, fold2.length)
  if (fold2L == "/" || fold2L == "\\") fold2 = fold2.substring(0, fold2.length - 1);
  if (fold1 == fold2) return true;
  return false;
}
FolderManager.fileExist=function(path, callback) {
  let prom = OS.File.exists(path);
  prom.then(callback);
}
FolderManager.readFile=function(path, callback) {
  if(callback==null) callback=function(){};
  let promise = OS.File.read(path, { encoding: "utf-8" });
  promise.then(callback);
}
FolderManager.writeFile=function(content, path, callback) {
  path = path || "fileWritted.json";
  if(callback==null) callback=function(){};
  let encoder = new TextEncoder();
  let array = encoder.encode(content);
  let prom = OS.File.writeAtomic(path, array,
    { tmpPath: path + ".tmp" });
  prom.then(callback);
}


// -------------------------------------------------
// FOLDER READER

function getFolderContent(path, extArray) {
  var that = this;
  this.path = path;
  this.exts = extArray || defaultExt;
  this.dirIndex = 0;
  this.content = {
    dirs: [],
    files: []
  }
  this.onEnd = function() {};
  this.content.dirs.push(this.path);

  this.readdir = function() {
    let iterator = new OS.File.DirectoryIterator(this.content.dirs[this.dirIndex]);
    let promise = iterator.forEach(
      function onEntry(entry) {
        if (entry.isDir) {
          that.content.dirs.push(entry.path);
        }else{
          let splt = entry.path.split(".");
          var ext = (splt.length > 1) ? splt[splt.length - 1] : "NO_EXT";
          that.exts.forEach(function(ex) {
            if (ext.toLowerCase() == ex)
              that.content.files.push(entry);
          });
        }
      }
    );
    promise.then(
      function() {
        iterator.close();
        that.moreDirs();
        return that.content;
      },
      function(reason) {
        iterator.close();
        throw reason;
      }
    );
  }
  this.moreDirs = function() {
    this.dirIndex++;

    if (this.content.dirs.length > this.dirIndex) {
      this.readdir();
    } else {
      this.endRead();
    }
  }
  this.endRead = function() {
/*
    console.log("========= END READ : " + this.path);
    console.log("   dirs.length : " + this.content.dirs.length);
    console.log("   dirIndex    : " + this.dirIndex);
    console.log("   ~~~   ");
    console.log("   file.length : " + this.content.files.length);
    console.log('==============================================');
*/
    this.onEnd();
  }
}

var ex = new Extention();
ex.initEvents();
