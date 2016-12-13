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

  this.c=new CommEmmiter('web','#FromExt','#FromWeb');

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
    that.initAjax();
    that.initLoaders();
    that.initEvents();
    that.initComm();
    that.initSettings();
    that.undump();
  }

  this.initLoaders=function(){
    that.l.b=new Loader(that.css.body);
    that.l.flst=new Loader(that.css.flst,'Loading<br><span id="flst_pbt">0%</span>');
    that.l.info=new Loader(that.css.info);
  }
  this.initAjax=function(){
    that.ajx.url="../function_transform/index1.php";
    that.ajx.onSendAll=this.onAjaxSendAll;
    that.ajx.onDone=this.onAjaxDone;
    that.ajx.onFail=this.onAjaxFail;
    that.ajx.onResult=this.onAjaxResult;
    that.ajx.onEnd=this.onAjaxEnd;
  }
  this.initSettings=function(){
    that.stgs.onClose=function(){};
    that.stgs.onCIl=function(){
      $(that.il.cnt).html('');
      that.il= new ItemListZMov();
      that.dump();
    };
    that.stgs.onAddFolder=function(n,l){
      //console.log(l);
      that.exmit('flist_set',l);
      that.exmit('flist_get');
      that.dump();
    };
    that.stgs.onDelFolder=function(n,l){
      //console.log('onDelFolder');
      //console.log(l);
      that.exmit('flist_set',l);
      that.exmit('flist_get');
      that.dump();
    };
    that.stgs.onExtChage=function(n){that.exmit('ext_set',n);};
    that.stgs.onFcbClick=function(){
      console.log(233454);
      that.exmit('folder_choose');
    };
  }
  this.initComm=function(){
    that.c.init();
    that.c.on('DEBUG',console.log);
    that.c.on('sync_ok',that.onSyncOk);
    that.c.on('flist_ok',that.onFlistOk);
    that.c.on('folder_ok',function(value){that.stgs.setFcbInputValue(value);});

    // teste si l'extention est présente
    setTimeout(function(){that.exmit('sync_get');},1000);
    setTimeout(function(){
      if(mainZMov.ext_found==false)
        $('#blocked>div.noext').html('<h1>No extention found</h1><h4>Please install ZMov-ext to use this app</h4>');
    },6000);

  }

  // vvv COMM EVENTS vvv //
  this.onFlistOk=function(n){
    var tmplist = [];
    for (var i=0 ; i<n.length ; i++){
      if(that.il.indexOfx(n[i].name)==-1){
        tmplist.push(n[i].name);
        var izm = new ItemZMov();
        izm.data.fname=n[i].name;
        izm.data.path=n[i].path;
        var dt=izm.data;
        dt.title='NoTitle';
        dt.date='NoDate';
        dt.acteurs=[];
        dt.directors=[];
        dt.genreids=[];
        dt.more='NoDescription';
        dt.imgSrcBig='src/img/noimgbig.jpg';
        dt.imgSrcSmall='src/img/noimgsmall.jpg';
        var id = that.il.add(izm);
      }
    }
    if(tmplist!=[]){
      that.ajx.setData(tmplist);
      that.ajx.sendAll();
    }
  }
  this.onSyncOk=function(ver){
    mainZMov.ext_found=true;
     // control que la version minimal soit acceptée.
    if(mainZMov.versionAccept(ver)){
      // accept version
      $('#blocked').remove();
    }else {
      // refuse version
      $('#blocked>div.noext').html('<h1>Extension is obsolete</h1><h4>Please update the ZMov-ext at least to v'+mainZMov.ext_min_v+'<br><small>Your is v'+ver+'</small></h4>');
    }
  }

  // vvv AJAX EVENTS vvv //
  this.onAjaxSendAll=function(){
    that.ratio={ok:0,fail:0};
    that.l.flst.show();
    $('#sorter').val('id');
    $('#flst_pbt').text('0.0%');
  }

  this.onAjaxDone=function(datas){
    var d={};
    try {
      d = JSON.parse(datas);
      //console.log(d);

      var it = that.il.getFromFname(d.fname);

      if(typeof it!='undefined'){
        if(d.response == 'ok'){
          var dr=d.results[0];
          that.ratio.ok++;
          it.tested=true;
          it.finded=true;
          var dt = it.data;
          dt.title=dr.title;
          dt.date=dr.release_date;
          dt.directors=d.directors||[];
          dt.acteurs=d.actors||[];
          dt.genreids=dr.genre_ids;
          dt.more=dr.overview;
          dt.imgSrcBig='https://image.tmdb.org/t/p/w600_and_h900_bestv2'+dr.poster_path;
          dt.imgSrcSmall='https://image.tmdb.org/t/p/w200_and_h300_bestv2'+dr.poster_path;

        }else{
          that.ratio.fail++;
          it.tested=true;
          it.finded=false;
          var dt=it.data;
          dt.title=d.ftrad||'NoTitle';
        }
        it.lastUpdate=Date.now();
        it.includeToList(true);
      }
    } catch (err) {
      that.ajx.abortAll();
      d.response='abort';
      that.l.flst.h();
      console.error("-X- AJAX_ERROR --> JSON_PARSE -> ");
      console.log(datas);
      console.log(err);
    }
  }
  this.onAjaxFail=function(err,status){
    console.error("-X- AJAX_ERROR --- "+status+" -> ");
    console.log(err);
    that.ajx.abortAll();
    that.l.flst.h();
  }
  this.onAjaxResult=function(){
    //console.log(that.ajx.nbrended+'/'+that.ajx.tot());
    var pc=(that.ajx.nbrended/that.ajx.tot()*100).toFixed(1);
    $('#flst_pbt').text(pc+'%');

  }
  this.onAjaxEnd=function(){
      that.l.flst.hide();
      console.log('ratio : '+ (that.ratio.ok*100/(that.ratio.ok+that.ratio.fail)) +'%');
      that.dump();
  }

  // vvv EVENTS USER vvv //
  this.initEvents=function(){
    $(window).on("resize",that.onWinResize);
    $('#in-search').on("change",that.onSearchChange);
    $('#cnt-movieList').on('click','.cnt-movieItem',that.onItemClick);
    $('#btnSettings').on('click',that.onSettingsClick);
    $('#a-path').on('click',function(ev){
      that.exmit('fopen',$(this).attr('data-path'))
    });
    $('#sorter').on('change',function(){
      that.sort(this.value);
    });
  }

  this.onWinResize=function(){
    //console.log("WinResized");
  }

  this.onSearchChange=function(val){
    //console.log(val.target.value);
    that.il.match(val.target.value);
    $('#sorter').val('id');
    //that.l.flst.show();
    //var x = setTimeout(function(){that.l.flst.hide();},10);
  }

  this.onItemClick=function(ev){
    var elem = ev.currentTarget;
    var id = $(elem).attr('data-itemid');
    //console.log("onItemClick -> "+id);
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


  this.dump=function(){
    if(!localStorage.zmovmain){
      localStorage.setItem('zmovmain',JSON.stringify(that));
    }
    else {
      localStorage.zmovmain=JSON.stringify(that);
    }
  }
  this.undump=function(){
    if(localStorage.zmovmain){
      var lsz=JSON.parse(localStorage.zmovmain);
      that.stgs.data=lsz.stgs.data;
      that.stgs.doOnUndump();
      for(var i=0;i<lsz.il.list.length;i++){
        that.il.addItemFromDump(lsz.il.list[i].data).includeToList(false);
      }
    }
  }
  this.sort=function(how){
    let type={
      id:function(a,b){
        a=parseInt($(a).attr('data-itemid'));
        b=parseInt($(b).attr('data-itemid'));
        return a-b;
      },
      title:function(a,b){
        a=$($(a).children()[1]).children()[0].innerHTML.trim();
        b=$($(b).children()[1]).children()[0].innerHTML.trim();
        return a.localeCompare(b);
      },
      title_rev:function(a,b){
        a=$($(a).children()[1]).children()[0].innerHTML.trim();
        b=$($(b).children()[1]).children()[0].innerHTML.trim();
        return b.localeCompare(a);
      },
      date:function(a,b){
        a=$($(a).children()[1]).children()[2].innerHTML.trim();
        b=$($(b).children()[1]).children()[2].innerHTML.trim();
        return a.localeCompare(b);
      },
      date_rev:function(a,b){
        a=$($(a).children()[1]).children()[2].innerHTML.trim();
        b=$($(b).children()[1]).children()[2].innerHTML.trim();
        return b.localeCompare(a);
      }
    };

    let table = $('#cnt-movieList').children();
    let table_sort = table.sort(type[how||'id']);
    for(var i=0; i<table_sort.length ; i++){
      let item = $(table_sort[i]);
      item.css('order',i);
    }
  }
}
mainZMov.ext_min_v="1.0.1";
mainZMov.ext_found=false;
mainZMov.versionSpliter=function(version){
  var v = version.split('.');
  var ret = [0,0,0];
  for(var i=0; i<v.length && i<3; i++){
    ret[i]+=parseInt(v[i]);
  }
  return ret;
}
mainZMov.versionAccept=function(other){
  var min=mainZMov.versionSpliter(mainZMov.ext_min_v);
  var oth=mainZMov.versionSpliter(other);
  for(var i=0; i<min.length ;i++){
    if(oth[i]<min[i]){
      return false;
    }
  }
  return true;
}

function n(text){
  return text.substring(1, text.length);
}
