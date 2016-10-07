function loader(){
  var that=this;

  this.state=0;

  this.css={
    elem:"#loader",
    hide:"hide",
    show:"show"
  };

  this.show=function(){
    var el = $(that.css.elem);
    if(el.hasClass(that.css.hide))
      el.removeClass(that.css.hide);
    el.appendClass(that.css.show);
    that.state=1;
    this.onShow();
  }

  this.hide=function(){
    var el = $(that.css.elem);
    if(el.hasClass(that.css.show))
      el.removeClass(that.css.show);
    el.appendClass(that.css.hide);
    that.state=0;
    this.onHide();
  }

  // state : show=1 ; hide=0
  this.setTo(state){
    if(state==1)that.show();
    if(state==0)that.hide();
  }

  this.switch(){
    that.beforeSwitch();
    if(that.state==0)that.setTo(1);
    else that.setTo(0);
    that.onSwitch();
  }

  this.onShow=function(){}
  this.onHide=function(){}
  this.beforeSwitch=function(){}
  this.onSwitch=function(){}
}
