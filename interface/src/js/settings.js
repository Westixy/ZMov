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
  }


  this.init();
}
