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

function ItemZMov(data){
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
    genreids:[],
    more:"",
    id:"",
    imgSrcBig:"",
    imgSrcSmall:"",
    path:''
  }

  this.tested=false;
  this.finded=false;
  this.lastUpdate=0;
  this.dontUpdate=false;

  this.setData=function(data){
    that.data.title=data.title;
    that.data.fname=data.fname||'';
    that.data.date=data.date;
    that.data.acteurs=data.acteurs||[];
    that.data.genreids=data.genreids||[];
    that.data.more=data.more;
    that.data.id=data.id;
    that.data.desc=data.desc;
    that.data.imgSrcBig=data.imgSrcBig;
    that.data.imgSrcSmall=data.imgSrcSmall;
    that.data.path=data.path||'';
  }

  this.includeToList=function(){
    var iB='<div data-itemid="'+that.data.id+'" class="'+n(that.css.item.container)+'">';
    iB+='<div class="'+n(that.css.item.thumbnails)+'">';
    iB+='    <img src="'+that.data.imgSrcSmall+'" alt="loading '+that.data.title+'" />';
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

  this.removeFromList=function(){
    var me = $(that.css.item.parent+" [data-itemid=\""+that.data.id+"\"]");
    if (typeof me!='undefined'){
      me.remove();
    }
  }

  this.updateCard=function(){
    $(that.css.full.img).attr("src",that.data.imgSrcBig);
    $(that.css.full.title).text(that.data.title);
    $(that.css.full.desc).html(that.data.more);
    var m="";
    that.data.acteurs.forEach(function(act){
      m+=act+'<br>';
    });
    $(that.css.full.acteurs).html(m);
    $(that.css.full.more).html(that.data.none);
  };

  this.match = function(text){
    //TODO : match avec this.data return true or false
    // si titre, acteurs et date son remplis cela doit matcher avec les 3
    // si titre, acteurs sont remplis il doit matcher avec les 2
    // etc...
    //text : input brute
    var titre = that.data.titre;
    var acteurs = that.data.acteurs; // thats an ARRAY !
    var date = that.data.date; // "2013-03-21"




  }

  this.setTitle=function(title){
    this.dontUpdate=true;
    this.data.title=title;
  }

  if(typeof data != 'undefined')this.setData(data);

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
