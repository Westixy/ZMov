const { Cu } = require("chrome");
const { TextDecoder, TextEncoder, OS } = Cu.import("resource://gre/modules/osfile.jsm", {});
var buttons = require('sdk/ui/button/action');
var tabs = require("sdk/tabs");
var self = require("sdk/self");
var ui = require("sdk/ui");
var { setTimeout } = require("sdk/timers");
var mytab = [];
var folder = [];
var allFiles = [];
var SDBarWorker = null;
var ConfigPath = "data/config.json";
var urlBase = "http://maw.dev";


// -------------------------------------------------
// sidebar
var sidebar = ui.Sidebar({
    id: 'movie-sidebar',
    title: 'Movie Sidebar',
    url: './sidebar/sidebar.html',
    onAttach: function(worker) {
        worker.port.on("initSDBar", function() {
            //console.log("- INIT SIDEBAR");
            worker.port.emit("SDBarInit", folder);
            refresh(worker);
        });
        worker.port.on("addFolder", function(fold) {
            fileExist(fold, function(exist) {
                if (!exist) {
                    worker.port.emit("onError", "Le répertoire n'existe pas -> " + fold);
                } else if (alreadyIsListed(fold)) {
                    worker.port.emit("onError", "Le répertoire est déjà dans la liste -> " + fold);
                } else {
                    folder.push(fold);
                    worker.port.emit("folderExist", folder);
                    writeConf();
                }
            });
        });
        worker.port.on("delFolder", function(fold) {
            var foldOk = false;
            if (folder.length > 1) {
                folder.forEach(function(entry, index) {
                    if (entry == fold) {
                        foldOk = true;
                        folder.splice(index, 1);
                    }
                });
            }
            if (foldOk) {
                worker.port.emit("delFolderOK", folder);
                writeConf();
            } else {
                worker.port.emit("onError", "Suppression du dossier impossible -> " + fold)
            }
        });
        worker.port.on("wantRefresh", function() {
            refresh(worker);

        });
    },
    onHide: onHide,
    onShow: onShow
});

function onHide(worker) {
    if (tabs.activeTab != null && startWith(urlBase, tabs.activeTab.url))
        setTimeout(function() { sidebar.show(); }, 200);
}

function onShow(worker) {
    if (!startWith(urlBase, tabs.activeTab.url))
        setTimeout(function() { sidebar.hide(); }, 200);
}

// -------------------------------------------------
// tabs
function onOpen(tab) {
    tab.on("pageshow", logShow);
    tab.on("activate", logActivate);
    tab.on("deactivate", logDeactivate);
    tab.on("close", logClose);
}

function logShow(tab) {
    if (startWith(urlBase, tab.url)) {
        //console.log("----AC");
        sidebar.show();
    }
    //console.log(tab.url + " is loaded");

}

function logActivate(tab) {
    if (startWith(urlBase, tab.url)) {
        //console.log("----AC");
        sidebar.show();
    }
    //console.log(tab.url + " is activated");
}

function logDeactivate(tab) {
    if (startWith(urlBase, tab.url)) {
        //console.log("----DC");
        sidebar.hide();
    }
    //console.log(tab.url + " is deactivated");
}

function logClose(tab) {
    if (startWith(urlBase, tab.url)) {
        //console.log("----DC");
        sidebar.hide();
    }
    //console.log(tab.url + " is closed");
}

tabs.on('open', onOpen);


// -------------------------------------------------
// BTN
var btn2 = buttons.ActionButton({
    id: "Broute",
    label: "Vreh",
    icon: {
        "16": "./ocon-16.png",
        "32": "./ocon-32.png",
        "64": "./ocon-64.png"
    },
    onClick: handleClick
});

function handleClick() {
    sidebar.show();
}

// -------------------------------------------------
// FUNCTIONS
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

function writeFile(content, path) {
    content = content;
    path = path || "fileWritted.json";
    let encoder = new TextEncoder(); // This encoder can be reused for several writes
    let array = encoder.encode(content); // Convert the text to an array
    let prom = OS.File.writeAtomic(path, array, // Write the array atomically to "file.txt", using as temporary
        { tmpPath: path + ".tmp" }); // buffer "file.txt.tmp".
    prom.then(function() {
        //console.log("=== FILE WRITED : " + path);
    });
}

function readFile(path, callback) {
    let promise = OS.File.read(path, { encoding: "utf-8" });
    promise = promise.then(
        callback
    );
}

function init() {
    var path = ConfigPath;
    //console.log(path);
    var conf = {};
    fileExist(path, function(exist) {
        if (exist) {
            readFile(path, function(text) {
                conf = JSON.parse(text);
                //console.log(conf);
                applyConf(conf);
            });
        } else {
            console.log("confFile does not exist : " + path)
        }
    });
}

function refresh(worker) {
    allFiles = [];
    readAllFolders(function() {
        worker.port.emit("refreshDone", allFiles)
        insertToNav();
    });
}

function applyConf(conf) {
    folder = conf.folders;
}

function writeConf() {
    var conf = { folders: folder };
    writeFile(JSON.stringify(conf), ConfigPath)
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

// -------------------------------------------------
// FOLDER READER

function getFolderContent(path, extArray) {
    var that = this;
    this.path = path;
    this.exts = extArray || ["mp4", "avi", "mkv", "dvx", "mov", "mpg", "mpa", "asf", "wma", "vob", "wmv"];
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

/// ======================================
// DO SOMETHING
//writeConf();
init();
