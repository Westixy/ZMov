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

  this.timewait=280;
  // temps d'attente entre 2 requetes
  // max 40 requetes par 10s

  this.ended=true;

  this.current=0;
  this.finded=0;
  this.nbrended=0;

  this.send=function(){
    this.ended=false;
    this.rq=$.ajax({
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
    this.nbrended++;
    this.onResult();
    if(that.finded==that.tot()){
      this.ended=true;
      this.onEnd();
    }
  }

  this.next=function(){
    if(this.last==true)return false;
    var rep=true;
    if(this.current>=this.data.length-1){that.last=true;rep=false;}
    this.dts=this.data[this.current];
    this.current++;
    this.send();
    return rep;
  }

  this.sendAll=function(){
    this.onSendAll();
    //while(this.next()){}
    var inter = setInterval(function(){
      if(!that.next()){
        clearInterval(inter);
      }
    }, that.timewait);
  }

  this.setData=function(data){
    if(this.ended==true){
      this.data=data;
      this.current=0;
      this.finded=0;
      this.last=false;
      return true;
    }
    return false;
  }

  this.tot=function(){
    return this.data.length;
  }
}
