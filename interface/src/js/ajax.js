function ajaxFace(url,done,fail){
  var that=this;

  this.url=url;

  this.onDone=done||function(){};
  this.onFail=done||function(){};

  this.send=function(){
    this.rq=$.ajax({

      method:

    });
    this.rq.done(function(m){

      this
    });
    this.rq.fail(function(jqxhr, status){

    });
  }
}
