/*

888b     d888          d8b
8888b   d8888          Y8P
88888b.d88888
888Y88888P888  8888b.  888 88888b.
888 Y888P 888     "88b 888 888 "88b
888  Y8P  888 .d888888 888 888  888
888   "   888 888  888 888 888  888
888       888 "Y888888 888 888  888

*/

function mainZMov(){
  var that=this;
  this.prop={};
  this.l={};

  this.il=new ItemListZMov();

  var d={
    title:"My title",
    fname:"ma_fname.waw",
    date:"10.10.2016",
    acteurs:["John", "CENA", "Cartman"],
    more:"<small>noMore</small><strong> Héhéhé</strong>",
    id:"0",
    desc:"MariaDb on fire",
    imgSrcBig:"http://images.fan-de-cinema.com/affiches/large/65/67886.jpg",
    imgSrcSmall:"http://s3images.coroflot.com/user_files/individual_files/projects/491612_1284695_cover_ps27yjaxigno7jzp2dhx.jpg"
  };

  this.init=function(){
    this.initLoaders();
    this.initEvents();

    for(var i =0;i<50;i++){
      if(i%2==0)
        this.il.addItemToList(d);
      else
        this.il.addItem(d);
    }



  }

  this.initLoaders=function(){
    that.l.b=new Loader("#bdy2");
    that.l.flst=new Loader("#loader-mvlst");
    that.l.info=new Loader("#loader-info");
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
    var id = $(elem).attr('data-itemid');
    console.log("onItemClick -> "+id);
    that.l.info.show();
    that.il.list[id].updateCard();
    var x = setTimeout(function(){that.l.info.hide();},1000);
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


function n(text){
  return text.substring(1, text.length);
}
