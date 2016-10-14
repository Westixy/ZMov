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






/*

8888888 888
  888   888
  888   888
  888   888888 .d88b.  88888b.d88b.
  888   888   d8P  Y8b 888 "888 "88b
  888   888   88888888 888  888  888
  888   Y88b. Y8b.     888  888  888
8888888  "Y888 "Y8888  888  888  888

*/

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
    that.data.acteurs=data.acteurs||[];
    that.data.more=data.more;
    that.data.id=data.id;
    that.data.desc=data.desc;
    that.data.imgSrcBig=data.imgSrcBig;
    that.data.imgSrcSmall=data.imgSrcSmall;
  }

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
    $(that.css.full.img).attr("src",that.data.imgSrcBig);
    $(that.css.full.title).text(that.data.title);
    $(that.css.full.desc).html(that.data.desc);
    var m="";
    that.data.acteurs.forEach(function(act){
      m+=act+'<br>';
    });
    $(that.css.full.acteurs).html(m);
    $(that.css.full.more).html(that.data.more);
  };

  this.init(data);

  /*this.init(
    {
      title:"My title",
      fname:"ma_fname.waw",
      date:"10.10.2016",
      acteurs:["John", "CENA", "Cartman"],
      more:"<small>noMore</small><strong> Héhéhé</strong>",
      id:"0",
      desc:"MariaDb on fire",
      imgSrcBig:"http://images.fan-de-cinema.com/affiches/large/65/67886.jpg",
      imgSrcSmall:"http://s3images.coroflot.com/user_files/individual_files/projects/491612_1284695_cover_ps27yjaxigno7jzp2dhx.jpg"
    }
  );*/

}

/*

8888888 888                          888      d8b          888
  888   888                          888      Y8P          888
  888   888                          888                   888
  888   888888 .d88b.  88888b.d88b.  888      888 .d8888b  888888
  888   888   d8P  Y8b 888 "888 "88b 888      888 88K      888
  888   888   88888888 888  888  888 888      888 "Y8888b. 888
  888   Y88b. Y8b.     888  888  888 888      888      X88 Y88b.
8888888  "Y888 "Y8888  888  888  888 88888888 888  88888P'  "Y888

*/

function ItemListZMov(){
  var that=this;
  this.cnt="#cnt-movieList";
  this.item=".cnt-movieItem";
  this.list=[];
  this.showed=[];

  this.addItem=function(data){
    var mitem=new itemZMov(data);
    that.list.push(mitem);
    data.id=that.list.lastIndexOf(mitem);
    mitem.data.id=data.id;

  }

  this.addItemToList=function(data){
    that.addItem(data);
    that.itemToList(data.id);
  }

  this.itemToList=function(id){
    that.showed[id]=that.list[id];
    that.list[id].includeToList();
  }

  this.rmItemFromList=function(id){
    var els = $(that.cnt+" "+that.item).toArray();
    els.forEach(function(item,ind){
      var it = $(item);
      if(it.attr("data-itemid")==id){

        that.showed.splice(id,1);
        $(item).remove();
      }
    });
  }

  this.rmItem=function(id){
    that.rmItemFromList(id);
    that.list.splice(id,1);
  }

  this.resetShowedList=function(){
    that.showed=[];
    $(that.cnt).html("");
  }

}

function n(text){
  return text.substring(1, text.length);
}
