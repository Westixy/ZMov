function ajaxSender(data,url,op){
  var that=this;

  this.data=data; // ["fname1.avi",'fname2.avi',...]
  this.url=url||'http://172.17.218.31/function_transform/search.php';

  /*
  op = {
    ondone:function(string reponse),
    onfail:function(ajaxStatus),
    onend:function()
  }
  */
  this.onDone=op.ondone||function(){};
  this.onFail=op.onfail||function(){};
  this.onEnd=op.onend||function(){};

  this.dts='';

  this.current=0;

  this.send=function(){
    this.rq=$.ajax({
      url:that.url,
      method:'POST',
      data:{entry:that.dts}
    });
    this.rq.done(function(m){
      var response = m;
      that.onDone(response);
      if(that.last) that.onEnd();
    });
    this.rq.fail(function(jqxhr, status){
      this.onFail(status)
      if(that.last) that.onEnd();
    });
  }

  this.next=function(){
    var rep=true;
    if(this.current>=this.data.length-1){rep=false;}
    this.dts=this.data[this.current];
    this.current++;
    this.send();
    return rep;
  }

  this.sendAll=function(){
    while(this.next()){}
  }

  this.updateData=function(data){
    this.data=data;
    this.current=0;
  }
}
