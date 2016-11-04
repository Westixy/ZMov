function ajaxSender(data,url,op){
  var that=this;

  this.data=data; // ["fname1.avi",'fname2.avi',...]
  this.url=url||'http://172.17.218.31/function_transform/search.php';

  /*
  op = {
    ondone:function(string reponse),
    onfail:function(ajaxStatus),
    onend:function(),
    nbrBySend:int
  }
  */
  this.onDone=op.ondone||function(){};
  this.onFail=op.onfail||function(){};
  this.onEnd=op.onend||function(){};
  this.qty=op.nbrBySend||1;

  this.dts=[];

  this.current=0;
  this.last=false;

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
    this.dts=[];
    var rep=true;
    if(this.current+this.qty>this.data.length){
      // si c'est le dernier next
      this.whileTo(this.data.length);
      rep=false;
    }else{
      this.whileTo(this.current+this.qty)
    }
    this.send();
    return rep;
  }
  this.whileTo=function(end){
    while(this.current<end){
      this.dts.push(this.data[this.current])
      this.current++;
    }
  }
  this.updateData=function(data){
    this.data=data;
    this.current=0;
    this.last=false;
  }
}
