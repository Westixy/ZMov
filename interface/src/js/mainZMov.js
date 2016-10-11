function mainZMov(){
  var that=this;
  this.prop={};
  this.l={};

  this.init=function(){
    this.initEvents();
    this.initLoaders();
  }

  this.initLoaders=function(){
    that.l.b=new Loader("body");
    that.l.flst=new Loader("#cnt-movieList");
  }

// vvv EVENTS USER vvv //
  this.initEvents=function(){
    $('#hiddenData').bind("DOMSubtreeModified",that.onDataChange);
    $(window).on("resize",that.onWinResize);
    $('#in-search').on("change",that.onSearchChange);
    $('#cnt-movieList').on('click','.cnt-movieItem',that.onItemClick);
    $('#btnSettings').on('click',that.onSettingsClick)
  }

  this.onDataChange=function(){
    console.log("content changed");
  }

  this.onWinResize=function(){
    console.log("WinResized");
  }

  this.onSearchChange=function(){
    console.log("onSearchChange");
    that.l.flst.show();
    var x = setTimeout(function(){that.l.flst.hide();},1000);
  }

  this.onItemClick=function(ev){
    var elem = ev.currentTarget;
    console.log("onItemClick -> "+$(elem).attr('data-itemid'));
  }

  this.onSettingsClick=function(){
    console.log("onSettingsClick");
  }

  // vvv EVENTS ZMov vvv //

  this.onLoad=function(){}
  this.afterInit=function(){}
  this.onDataRecived=function(data){}
  this.onSearchEnd=function(){}

  this.on=function(){}
  this.onx=function(){}
}
