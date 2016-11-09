const { Cu } = require("chrome");
const { TextDecoder, TextEncoder, OS } = Cu.import("resource://gre/modules/osfile.jsm", {});
var tabs = require("sdk/tabs");
var self = require("sdk/self");
var ui = require("sdk/ui");
var { setTimeout } = require("sdk/timers");

var urlBase = "http://maw.dev/interface";
var defaultExt = ["mp4", "avi", "mkv", "dvx", "mov", "mpg", "mpa", "asf", "wma", "vob", "wmv"];

var mytab = [];
var folder = [];
var allFiles = [];
var ConfigPath = "data/config.json";



/*
====================
       EVENTS
====================
*/
tabs.on('ready', tabsOnReady);


function tabsOnReady(tab){
 // TODO
}


/*
====================
        UTILS
====================
*/

function insertToNav() {
  for (let tab of tabs) {
    if (startWith(urlBase, tab.url)) {
      var wkr = tab.attach({
        contentScriptFile: self.data.url("web.js")
      });
      wkr.port.emit("loadjson", allFiles);
    }
  }
}

function webActualise(folderlist){
  if(folderlist!=[]){
    folder=folderlist;
    readAllFolders(insertToNav);
  }
}

function listenForAnUpdateFromNav() {
    for (let tab of tabs) {
        var wks=null;
        if (startWith(urlBase, tab.url)) {
          wks = tab.attach({
              contentScriptFile: self.data.url("web.js")
          });
          if(wks!=null) wks.port.on("HeyBro_ActualiseMe",webActualise);
        }
    }
}

function readAllFolders(callback) {
    var folderOk = 0;
    folder.forEach(function(entry) {
        readAFolder(entry, function() {
            folderOk++;
            if (folderOk >= folder.length) {
                callback();
            }
        });
    });
}

function readAFolder(folderPath, callback) {
    var gfc = new getFolderContent(folderPath);

    gfc.onEnd = function() {
        allFiles = allFiles.concat(gfc.content.files);
        callback();
    };
    gfc.readdir();
}

function fileExist(path, callback) {
    let prom = OS.File.exists(path);
    prom.then(function(some) { callback(some); });
}

function alreadyIsListed(fold) {
    var exist = false;
    folder.forEach(function(entry) {
        if (foldEquals(fold, entry)) exist = true;
    });
    return exist;
}

function foldEquals(fold1, fold2) {
    let fold1L = fold1.substring(fold1.length - 1, fold1.length)
    if (fold1L == "/" || fold1L == "\\") fold1 = fold1.substring(0, fold1.length - 1);
    let fold2L = fold2.substring(fold2.length - 1, fold2.length)
    if (fold2L == "/" || fold2L == "\\") fold2 = fold2.substring(0, fold2.length - 1);
    if (fold1 == fold2) return true;
}

function startWith(pattern, text) {
    return (text.substring(0, pattern.length) == pattern);
}

function writeFile(content, path, callback) {
    path = path || "fileWritted.json";
    if(callback==null) callback=function(){};
    let encoder = new TextEncoder(); // This encoder can be reused for several writes
    let array = encoder.encode(content); // Convert the text to an array
    let prom = OS.File.writeAtomic(path, array, // Write the array atomically to "file.txt", using as temporary
        { tmpPath: path + ".tmp" }); // buffer "file.txt.tmp".
    prom.then(callback);
}

function readFile(path, callback) {
    if(callback==null) callback=function(){};
    let promise = OS.File.read(path, { encoding: "utf-8" });
    promise.then(callback);
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
    this.onEnd = function() {}
    this.content.dirs.push(this.path);

    this.readdir = function() {
        //console.log("++ READING    : " + this.content.dirs[this.dirIndex]);
        let iterator = new OS.File.DirectoryIterator(this.content.dirs[this.dirIndex]);
        let promise = iterator.forEach(
            function onEntry(entry) {
                if (entry.isDir) {
                    that.content.dirs.push(entry.path);
                } else {
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
        console.log("========= END READ : " + this.path);
        console.log("   dirs.length : " + this.content.dirs.length);
        console.log("   dirIndex    : " + this.dirIndex);
        console.log("   ~~~   ");
        console.log("   file.length : " + this.content.files.length);
        this.onEnd();
    }
}
