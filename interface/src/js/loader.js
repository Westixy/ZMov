function Loader(selector,text,anim){
  var that=this;

  this.iterate=0;
  this.state=0;
  this.text=text||'Loading';
  this.loaderAnimation=anim||'<img src="src/img/load.svg" alt="loader">';

  this.css={
    elem:selector||".cnt-loader",
    cont:"cntload",
    html:"htmlload",
    item:"loader",
    hide:"loadhide",
    show:"loadshow"
  };
  $(that.css.elem).html('<div class="'+that.css.cont+' '+that.css.hide+'" ><div class="'+that.css.html+'" >'+$(that.css.elem).html()+'</div></div>');
  $(that.css.elem +' > .'+that.css.cont).append('<div class="'+that.css.item+'"><div>'+that.text+'<br>'+that.loaderAnimation+'</div></div>');


  this.pointer=$(that.css.elem+' > .'+that.css.cont);

  this.s=function(){
    var el = that.pointer;
    if(el.hasClass(that.css.hide))
      el.removeClass(that.css.hide);
    el.addClass(that.css.show);
    that.state=1;
    this.onShow();
  }

  this.show=function(){
    this.iterate++;
    if(this.iterate==1){
      this.s();
    }
  }

  this.h=function(){
    var el = that.pointer;
    if(el.hasClass(that.css.show))
      el.removeClass(that.css.show);
    el.addClass(that.css.hide);
    that.state=0;
    this.onHide();
  }

  this.hide=function(){
    this.iterate--;
      if(this.iterate<=0){
        this.h();
      }
  }

  // state : show=1 ; hide=0
  this.setTo=function(state){
    if(state==1)that.show();
    if(state==0)that.hide();
  }

  this.switch=function(){
    if(that.state==0)that.setTo(1);
    else that.setTo(0);
    that.onSwitch();
  }

  this.onShow=function(){}
  this.onHide=function(){}
  this.onSwitch=function(){}
}
