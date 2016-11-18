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

  this.ajx=new AjaxSender();

  this.stgs=new ZMovSettings();

  this.c=new CommEmmiter('web','#FromWeb','#FromExt');

  this.css={
    body:"#bdy2",
    flst:"#loader-mvlst",
    info:"#loader-info",
    settings:"#settings",
  }

  this.ratio={
    ok:0,
    fail:0
  }


  // INITERS //
  this.init=function(){
    this.initAjax();
    this.initLoaders();
    this.initEvents();
    this.initComm();
  }

  this.initLoaders=function(){
    that.l.b=new Loader(that.css.body);
    that.l.flst=new Loader(that.css.flst);
    that.l.info=new Loader(that.css.info);
  }
  this.initAjax=function(){
    this.ajx.url="../function_transform/index1.php";
    this.ajx.onSendAll=this.onAjaxSendAll;
    this.ajx.onDone=this.onAjaxDone;
    this.ajx.onFail=this.onAjaxFail;
    this.ajx.onResult=this.onAjaxResult;
    this.ajx.onEnd=this.onAjaxEnd;
  }
  this.initComm=function(){
    this.c.init();
    // TODO set the listeners for the communicator
    this.c.on('flist_ok',onFlistOk);
  }


  // vvv COMM EVENTS vvv //
  this.onFlistOk=function(n){
    console.log("content changed");
    return;
    var tmplist = [];
    for (var i=0 ; i<n.length ; i++){
      if(that.il.indexOfx(n[i].name)==-1){
        tmplist.push(n[i].name);
        var izm = new ItemZMov();
        izm.data.fname=n[i].name;
        izm.data.path=n[i].path;
        var id = that.il.add(izm);
      }
    }
    if(tmplist!=[]){
      that.ajx.setData(tmplist);
      that.ajx.sendAll();
    }
  }

  // vvv AJAX EVENTS vvv //
  this.onAjaxSendAll=function(){
    that.ratio={ok:0,fail:0};
    that.l.flst.show();
  }

  this.onAjaxDone=function(datas){
    var d = JSON.parse(datas)
    var it = that.il.getFromFname(d.fname);
    //console.log(it);
    //return;
    if(typeof it!='undefined'){
      if(d.response == 'ok'){
        that.ratio.ok++;
        it.tested=true;
        it.finded=true;
        var dt = it.data;
        dt.title=d.title;
        dt.date=d.release_date;
        dt.acteurs=[]; // TODO : ACTEURS !!!!! pas dans la BDD
        dt.genreids=d.genre_ids; // TODO : on a que les ids des genres
        dt.more=d.overview;
        dt.imgSrcBig='https://image.tmdb.org/t/p/w600_and_h900_bestv2'+d.poster_path;
        dt.imgSrcSmall='https://image.tmdb.org/t/p/w200_and_h300_bestv2'+d.poster_path;

      }else{
        that.ratio.fail++;
        it.tested=true;
        it.finded=false;
        var dt=it.data;
        dt.title=d.ftrad||'NoTitle';
        dt.date='NoDate';
        dt.acteurs=[];
        dt.genreids=[];
        dt.more='NoDescription';
        dt.imgSrcBig='src/img/noimgbig.jpg';
        dt.imgSrcSmall='src/img/noimgsmall.jpg';
      }
      it.lastUpdate=Date.now();
      it.includeToList();
    }
    console.log(d);
  }
  this.onAjaxFail=function(err,status){
    console.log("-X- AJAX_ERROR --- "+status+" -> ");
    console.log(err);
  }
  this.onAjaxResult=function(){
    console.log(that.ajx.nbrended+'/'+that.ajx.tot());
  }
  this.onAjaxEnd=function(){
      that.l.flst.hide();
      console.log('ratio : '+ (that.ratio.ok*100/(that.ratio.ok+that.ratio.fail)) +'%');
  }

  // vvv EVENTS USER vvv //
  this.initEvents=function(){
    $(window).on("resize",that.onWinResize);
    $('#in-search').on("change",that.onSearchChange);
    $('#cnt-movieList').on('click','.cnt-movieItem',that.onItemClick);
    $('#btnSettings').on('click',that.onSettingsClick);
  }

  this.onWinResize=function(){
    console.log("WinResized");
  }

  this.onSearchChange=function(){
    console.log("onSearchChange");
    //that.l.flst.show();
    //var x = setTimeout(function(){that.l.flst.hide();},10);
  }

  this.onItemClick=function(ev){
    var elem = ev.currentTarget;
    var id = $(elem).attr('data-itemid');
    console.log("onItemClick -> "+id);
    //that.l.info.show();
    that.il.list[id].updateCard();
    //var x = setTimeout(function(){that.l.info.hide();},1000);
  }

  this.onSettingsClick=function(){
    $(that.css.settings).removeClass('hidden');
  }

  // vvv EVENTS ZMov vvv //

  this.onLoad=function(){}
  this.afterInit=function(){}
  this.onDataRecived=function(data){}
  this.onSearchEnd=function(){}

  this.on=function(){}
  this.onx=function(){}

  // Alias
  this.exmit=function(action,vars){
    that.c.emit('ext',action,vars);
  }
}


function n(text){
  return text.substring(1, text.length);
}
