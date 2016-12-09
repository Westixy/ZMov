function AjaxSender(op){
  var that=this;

  this.data=[]; // ["fname1.avi",'fname2.avi',...]

  /*
  op = {
    url:string
    ondone:function(string reponse),
    onfail:function(ajaxStatus),
    onend:function()
  }
  */
  var opt=op||{
    url:'',
    onsendall:function(){},
    ondone:function(){},
    onfail:function(){},
    onresult:function(){},
    onend:function(){}
  };

  this.url=opt.url;
  this.onSendAll=opt.onsendall;
  this.onDone=opt.ondone;
  this.onFail=opt.onfail;
  this.onResult=opt.onresult;
  this.onEnd=opt.onend;

  this.dts='';

  this.timewait=1000;
  // temps d'attente entre 2 requetes
  // max 40 requetes par 10s
  // 3 requetes par films sont generees en php

  this.ended=true;

  this.current=0;
  this.finded=0;
  this.nbrended=0;

  this.send=function(){
    that.ended=false;
    that.rq=$.ajax({
      url:that.url,
      method:'POST',
      data:{entry:that.dts}
    });
    this.rq.done(function(response){
      that.finded++;
      that.onDone(response);
      that.onRes();
    });
    this.rq.fail(function(jqxhr, status){
      that.onFail(jqxhr,status);
      that.onRes();
    });
  }

  this.onRes=function(){
    that.nbrended++;
    that.onResult();
    if(that.finded==that.tot()){
      that.ended=true;
      that.onEnd();
    }
  }

  this.next=function(){
    if(that.last==true)return false;
    var rep=true;
    if(that.current>=that.data.length-1){that.last=true;rep=false;}
    that.dts=that.data[that.current];
    that.current++;
    that.send();
    return rep;
  }

  this.sendAll=function(){
    that.onSendAll();
    that.current=0;
    that.finded=0;
    that.nbrended=0;
    //while(this.next()){}
    var inter = setInterval(function(){
      if(!that.next()){
        clearInterval(inter);
      }
    }, that.timewait);
  }

  this.setData=function(data){
    if(that.ended==true){
      that.data=data;
      that.current=0;
      that.finded=0;
      that.last=false;
      return true;
    }
    return false;
  }

  this.tot=function(){
    return that.data.length;
  }
}
