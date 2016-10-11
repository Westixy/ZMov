function mainZMov(){
  var that=this;
  this.prop={};
  this.l={};

  this.init=function(){
    this.initLoaders();
    this.initEvents();

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
    console.log("onItemClick -> "+$(elem).attr('data-itemid'));
    that.l.info.show();
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

function itemZMov(data,onclick){
  var that=this;
  this.events={
    onclick:function(){}
  };
  this.css={
    item:{
      container:".cnt-movieItem",
      thumbnails:".cnt-thumnails",
      miniTxt:".cnt-miText",
      title:".miTitle",
      name:".miName"
      date:".miDate"
    },
    full:{
      container:"#cnt-movieCard",
      img:"#cnt-movieCard > div > img"
      cntInfo:"cnt-textInfo",
      title:"movieTitle",
      rawText:"preRawText"
      cntDesc:"cnt-desc",
      cntAct:"",
      cntMore:"",
      desc:"txt-desc",
      acteurs:"txt-acteurs",
      more:"cnt-pinfo"
    }
  };

  this.data={
    title:"",
    fname:"",
    date:"",
    acteurs:[],
    more:"",
    id:"",
    imgSrcBig:"",
    imgSrcSmall:""
  }

  this.init=function(data,onclick){
    that.data.title=data.title;
    that.data.fname=data.fname;
    that.data.date=data.date;
    that.data.acteurs=data.acteurs;
    that.data.more=data.more;
    that.data.imgSrcBig=data.imgSrcBig;
    that.data.imgSrcSmall=data.imgSrcSmall;

    that.events.onclick=onclick;
  }

}

function n(text){
  return text.substring(1, text.length)
}
