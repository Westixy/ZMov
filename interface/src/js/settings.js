function ZMovSettings(){
  var that=this;
  this.css={
    cnt:"#settings",
    close:"#btn-settings-close",
    flist:".folder-list",
    delfolder:".delete-folder",
    btnAdd:"#btn-addfolder",
    inpfolder:"#inpaddfolder",
    btnExt:"#btn-confExt",
    btnClearIl:"#btn-clearIl",
    inpext:"#inpextentions",
  }

  this.data={
    flist:[],
    ext:['_default_']
  }

  this.init=function(){
    $(this.css.close).on('click',that.onBtnClose);
    $(this.css.flist).on('click', that.css.delfolder ,that.onBtnDelFolder);
    $(this.css.btnAdd).on('click',that.onBtnAddFolder);
    $(this.css.btnExt).on('click',that.onBtnExt);
    $(this.css.btnClearIl).on('click',that.onBtnCIl);
  }

  this.doOnUndump=function(){
    for(var i=0; i<that.data.flist.length ; i++){
      $(that.css.flist).append('<div class="folder-item"><span class="fdata">'+
        that.data.flist[i]+'</span><span class="delete-folder">X</span></div>');
    }
  }

  this.onBtnClose=function(ev){
    $(that.css.cnt).addClass('hidden');
    that.onClose();
  }
  this.onBtnCIl=function(ev){
    if(confirm('Voulez vous vraiment supprimer les films mis en cache ?'))
      that.onCIl();
  }
  this.onBtnAddFolder=function(ev){
    var val = $(that.css.inpfolder).val().trim();
    if(that.data.flist.indexOf(val)<0 && !that.folderInList(val)){
      that.data.flist.push(val);
      $(that.css.flist).append('<div class="folder-item"><span class="fdata">'+val+'</span><span class="delete-folder">X</span></div>');
      //console.log('onAddFolder');
      that.onAddFolder(val,that.data.flist);
    }
  }
  this.onBtnDelFolder=function(ev){
    var cnt = $(ev.currentTarget).parent(".folder-item");
    var item = $(ev.currentTarget).siblings('.fdata');
    var val = item.text().trim();
    var idx = that.data.flist.indexOf(val);
    if(idx>=0){
      that.data.flist.splice(idx,1);
      that.onDelFolder(val,that.data.flist);
    }
    cnt.remove();
  }
  this.onBtnExt=function(ev){
    var val = $(that.css.inpext).val().trim();
    var exts=[];

    if(val==''){
      exts=['_default_'];
    }else{
      var freaki=[];
      freaki=val.split(';');

      for(var i=0;i<freaki.length;i++){
        var tmp = freaki[i].trim();
        if(tmp!=''){
          exts.push(tmp);
        }
      }
    }
    if(that.data.ext!=exts){
      that.data.ext=exts;
      console.log('onExtChage');
      that.onExtChange(exts);
    }
  }

  this.foldEquals=function(fold1, fold2) {
      let fold1L = fold1.substring(fold1.length - 1, fold1.length);
      if (fold1L == "/" || fold1L == "\\") fold1 = fold1.substring(0, fold1.length - 1);
      let fold2L = fold2.substring(fold2.length - 1, fold2.length);
      if (fold2L == "/" || fold2L == "\\") fold2 = fold2.substring(0, fold2.length - 1);
      if (fold1 == fold2) return true;
      return false;
  }
  this.folderInList=function(path){
    for(var i =0; i<that.data.flist ; i++)
      if(that.foldEquals(that.data.flist[i],path))
        return true;
    return false;
  }

  this.onClose=function(){};
  this.onCIl=function(){};
  this.onAddFolder=function(path){};
  this.onDelFolder=function(path){};
  this.onExtChange=function(exts){};

  this.init();
}
