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

var version="1.0.4";


/**
 * Extention.constructor - classe principale de l'extention
 */
function Extention(){
  var that = this;

  /**
   * la classe de gesion des dossiers
   */
  this.fm=new FolderManager();

  /**
   *  tableau stockant les différentes instance de l'application sur le navigateur
   */
  this.web=[]; // workers for web

  /*
  ====================
         EVENTS
  ====================
  */

  /**
   * Extention.initEvents - initialisation des événements du navigateur
   */
  this.initEvents=function(){
    var tabs = require("sdk/tabs");

    tabs.on('load',that.tabsOnReady);
    //tabs.on('ready',function(tab){console.log('ready '+tab.title);})    });
    //tabs.on('ready', that.tabsOnReady);
  }

  // vvv TABS EVENTS vvv //

  /**
   * Extention.tabsOnReady - événements lorsque une tablulation est chargée<br>
   * vérifie si c'est une application zmov, si oui attache le script pour l'application
   *
   * @param  {sdk_tabs_tab} tab description
   */
  this.tabsOnReady=function(tab){
    setTimeout(function () {
      if(tab.window.title.indexOf("ZMov app")>=0){
        that.webAttach(tab);
      }
    }, 500);
  }

  // vvv Workers EVENTS vvv //

  /**
   * Extention.setWorkerEvents - initialisation des evenements pour la communication avec le page web
   *
   * @param  {worker} wkr lien de communication avec le fichier ./data/web.js
   */
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
      debug(that);
    });
  }

  /*
  ====================
          UTILS
  ====================
  */

  /**
   * Extention.webAttach - Attachement des scripts a l'onglet du navigateur'
   *
   * @param  {sdk_tabs_tab} tab l'onglet a associer
   */
  this.webAttach=function(tab){
    var wkr = tab.attach({
      contentScriptFile: [self.data.url("comm.js"),self.data.url("web.js")]
    });
    that.web.push(wkr);
    that.setWorkerEvents(wkr);
  }


  /**
   * Extention.actualiseAndEmit - recherche les fichiers films dans les répertoires et les envoies à la page web
   */
  this.actualiseAndEmit=function(){
    that.fm.files=[];
    that.fm.readAll(function(){
      that.wemit('flist_ok',that.fm.files);
    });
  }

  // Alias
  //
  /**
   * Extention.wemit - simplification de l'envoi d'action aux pages web.<br>
   * si il y a plusieurs instances de page web , fait un broadcast sur toutes les instance (les supprimes si elles ne sont plus liées)
   *
   * @param  {string} action l'action a executer par l'application
   * @param  {rainbow} vars  les données a transmettre a l'application
   */

  this.wemit=function(action,vars){
    for(var i=0; i<that.web.length ; i++){
      try {
        that.web[i].port.emit(action,vars);
      } catch (err) {
        console.log(err);
        that.web.splice(i,1);
        continue;
      }
    }
  }

}
Extention.startWith=function(pattern,text){
  return (text.substring(0, pattern.length) == pattern);
}

/**
 * Extention.fopen - execute un fichier local avec son application par défaut
 *
 * @param  {string} path le chemin absolus du fichier
 */
Extention.fopen=function(path){
  debug("FOPEN => <"+path+">");
  require('chrome').Cu.import('resource://gre/modules/FileUtils.jsm');
  new FileUtils.File(path).launch();
}


/**
 * FolderManager.constructor - classe gérant l'obtention du contenu des repertoires
 */
function FolderManager(){
  var that=this;

  this.folders=[];

  /**
   * la liste des fichies récupérés  (chemin complet)
   */
  this.files=[];


  /**
   * FolderManager.add - ajoute un répertoire a la liste des répertoires a fouiller
   *
   * @param  {string} path chemin du dossier
   */
  this.add=function(path){
    if(that.folders.indexOf(path)<0){
      that.folders.push(path);
    }
  }


  /**
   * FolderManager.remove - supprime un répertoire de la liste
   *
   * @param  {string} path le path du répertoire a supprimer
   */
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

  /**
   * FolderManager.readOne - lis un répertoire
   *
   * @param  {string} path     le path du répertoire a scanner
   * @param  {function} callback la fonction a executer une fois le répertoire a fini d'etre scanné
   */
  this.readOne=function(path, callback) {
      var gfc = new getFolderContent(path);

      gfc.onEnd = function() {
          that.files = that.files.concat(gfc.content.files);
          callback();

      };
      gfc.readdir();
  }

  /**
   * FolderManager.readAll - lis tous les répertoires récursivement
   *
   * @param  {function} callback la fonction a executer une fois que tous les répertoires on été scannés
   */
  this.readAll=function(callback) {
    var folderOk = 0;
    that.files=[];

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


/**
 * getFolderContent.constructor - classe de scan d'un répertoire récursivement
 *
 * @param  {string} path     le répertoire a scanner
 * @param  {array} extArray [facultatif] la liste des extentions a conserver
 */
function getFolderContent(path, extArray) {
  var that = this;
  this.path = path;
  this.exts = extArray || defaultExt;
  this.dirIndex = 0;
  this.content = {
    dirs: [],
    files: []
  }

  /**
   * getFolderContent.onEnd - fonction a executer lorseque le répertoire a fini d'etre lu
   */
  this.onEnd = function() {};
  this.content.dirs.push(this.path);


  /**
   * getFolderContent.readdir - fonction de lecture du répertoire courrant (this.content.dirs[this.dirIndex])
   */
  this.readdir = function() {
    let iterator = new OS.File.DirectoryIterator(this.content.dirs[this.dirIndex]);
    let promise = iterator.forEach(
      function onEntry(entry) {
        if (entry.isDir) {
          that.content.dirs.push(entry.path);
        }else{
          let splt = entry.path.split(".");
          var ext = (splt.length > 1) ? splt[splt.length - 1] : "NO_EXT";
          if (that.exts.indexOf(ext.toLowerCase())>-1)
            that.content.files.push(entry);
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

  /**
   * getFolderContent.moreDirs - demande de lire le prochain répertoire si il y en a un sinon execute this.onEnd
   */
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
