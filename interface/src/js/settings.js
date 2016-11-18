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
    inpext:"#inpextentions",
  }

  this.data={
    flist:[],
    ext:[]
  }

  this.init=function(){
    $(this.css.close).on('click',that.onBtnClose);
    $(this.css.flist).on('click', that.css.delfolder ,that.onDelFolder);
    $(this.css.btnAdd).on('click',that.onBtnAddFolder);
    $(this.css.btnExt).on('click',that.onBtnExt);
  }

  this.onBtnClose=function(ev){
    $(that.css.cnt).addClass('hidden');
  }
  this.onBtnAddFolder=function(ev){
    console.log($(that.css.inpfolder).val());

  }
  this.onDelFolder=function(ev){
    var cnt = $(ev.currentTarget).parent(".folder-item");
    var item = $(ev.currentTarget).siblings('.fdata');
    console.log(item.text());
    // TODO the remove function
  }
  this.onBtnExt=function(ev){
    console.log($(that.css.inpext).val());
  }

  this.addFolder=function(path){
    if(that.folderInList(path)){
      console.log('folder "'+path+'" already in list.');
      return;
    }
    
  }

  this.foldEquals=function(fold1, fold2) {
      let fold1L = fold1.substring(fold1.length - 1, fold1.length);
      if (fold1L == "/" || fold1L == "\\") fold1 = fold1.substring(0, fold1.length - 1);
      let fold2L = fold2.substring(fold2.length - 1, fold2.length);
      if (fold2L == "/" || fold2L == "\\") fold2 = fold2.substring(0, fold2.length - 1);
      if (fold1 == fold2) return true;
  }
  this.folderInList=function(path){
    for(var i =0; i<that.data.flist ; i++)
      if(that.foldEquals(that.data.flist[i],path))
        return true;
    return false;
  }


  this.init();
}
