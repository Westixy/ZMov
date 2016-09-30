/*
addon = {
    port: {
        emit: function() {},
        on: function() {}
    }
} /* */

var allFiles = [];

// demande l'initialisation'
addon.port.emit("initSDBar");

// à l'initilisation'
addon.port.on("SDBarInit", function(folders) {
    updateFoldList(folders);

});

// si le dossier a ajouter existe
addon.port.on("folderExist", function(folders) {
    updateFoldList(folders);
});

// ajouter un dossier
$("#btnAdd").on("click", function() {
    afolder = $("#inpAdd").val();
    addon.port.emit("addFolder", afolder);
});

// demande d'enlever un dossier
$("#txt").on("click", "div", function(item) {
    folder = item.target.innerText;
    addon.port.emit("delFolder", folder);
});

// si le dossier peut etre supprimé
addon.port.on("delFolderOK", function(folders) {
    updateFoldList(folders);
});

// si Erreur
addon.port.on("onError", function(error) {
    showError(error);
});

// demande de refresh
$("#actuListFile").on("click", function() {
    addon.port.emit("wantRefresh");
});

// réponse du refresh
addon.port.on("refreshDone", function(aFiles) {
    //console.log("==== refreshDone");
    $("#fNumber").text(aFiles.length);
    allFiles = aFiles;

});

function showError(text) {
    $("#error").text(text);
    setTimeout(function() { $("#error").text(""); }, 3000);
}

function updateFoldList(folders) {
    $("#txt").html("");
    folders.forEach(function(folder) {
        $("#txt").append("<div>" + folder + "</div>");
    })
}