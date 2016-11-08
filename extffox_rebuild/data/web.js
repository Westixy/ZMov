var hiddenData = document.querySelectorAll('div#hiddenData');
var actualiseBtn = document.querySelectorAll('div#btnUpdateFileList');
var foldersLink = document.querySelectorAll('div#foldersLink')

self.port.on("loadjson", function(mjson) {
    if(typeof hiddenData[0] != 'undefined'){
      var elem = hiddenData[0];
      elem.textContent = JSON.stringify(mjson);
    }else {
      console.log('hiddenData -> dont exist');
    }
});

if(typeof actualiseBtn[0] != 'undefined'){
  var elem = actualiseBtn[0];
  elem.onclick= function(){
    if(typeof foldersLink[0] != 'undefined'){
      var foldlinks=foldersLink[0];
      self.port.emit('HeyBro_ActualiseMe', JSON.parse(foldlinks.textContent));
    }else {
      console.log('foldersLink -> dont exist');
    }
  }
}else {
  console.log('actualiseBtn -> dont exist');
}
