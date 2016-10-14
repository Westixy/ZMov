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

function itemZMov(data){
  var that=this;
  this.css={
    item:{
      parent:"#cnt-movieList",
      container:".cnt-movieItem",
      thumbnails:".cnt-thumnails",
      miniTxt:".cnt-miText",
      title:".miTitle",
      name:".miName",
      date:".miDate"
    },
    full:{
      container:"#cnt-movieCard",
      img:"#cnt-movieCard > div > img",
      cntInfo:".cnt-textInfo",
      title:".movieTitle",
      rawText:".preRawText",
      cntDesc:".cnt-desc",
      cntAct:".cnt-acteurs",
      cntMore:".cnt-moreinfo",
      desc:"#txt-desc",
      acteurs:"#txt-acteurs",
      more:"#cnt-pinfo"
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

  this.init=function(data){
    that.data.title=data.title;
    that.data.fname=data.fname;
    that.data.date=data.date;
    that.data.acteurs=data.acteurs;
    that.data.more=data.more;
    that.data.id=data.id;
    that.data.imgSrcBig=data.imgSrcBig;
    that.data.imgSrcSmall=data.imgSrcSmall;
  }

  this.events={
    itemOnClick:function(){
      console.log("itemOnClick");
    }
  };

  this.includeToList=function(){
    var iB='<div data-itemid="'+that.data.id+'" class="'+n(that.css.item.container)+'">';
    iB+='<div class="'+n(that.css.item.thumbnails)+'">';
    iB+='    <img src="'+that.data.imgSrcSmall+'" alt="thumbnails small img '+that.data.title+'" />';
    iB+='  </div>';
    iB+='  <div class="'+n(that.css.item.miniTxt)+'">';
    iB+='    <div class="'+n(that.css.item.title)+'">';
    iB+='      '+that.data.title;
    iB+='    </div>';
    iB+='    <div class="'+n(that.css.item.name)+'">';
    iB+='      '+that.data.fname;
    iB+='    </div>';
    iB+='    <div class="'+n(that.css.item.date)+'">';
    iB+='      '+that.data.date;
    iB+='    </div>';
    iB+='  </div>';
    iB+='</div>';
    $(that.css.item.parent).append(iB);
  };

  this.updateCard=function(){
    $(that.css.full.img).src(that.data.imgSrcBig);
    $(that.css.full.title).text(that.data.title);
    $(that.css.full.desc).text(that.data.desc);
    var m="";
    that.data.acteurs.forEach(function(act){
      m+=act+'\n';
    });
    $(that.css.full.acteurs).text(that.data.acteurs);
    $(that.css.full.more).html(that.data.more);
  };

}

function n(text){
  return text.substring(1, text.length);
}
