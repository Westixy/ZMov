function Comm(id,recive,send){
  var that=this;

  this.r=document.querySelector(recive);
  this.s=document.querySelector(send);

  this.id=id;

  this.actions={};

  this.sample={
    id:null,
    from:id,
    action:null,
    vars:null
  }


  this.emit=function(who,action,vars){
    this.sample.id=who;
    this.sample.action=action;
    this.sample.vars=vars;
    this.s.innerHTML=JSON.stringify(this.sample);
  }
  this.on=function(action,callback){
    if(typeof that.actions[action]=="undefined")that.actions[action]=[];
    if(that.actions[action].indexOf(callback)<0)
      that.actions[action].push(callback);
    console.log(that.actions);
  }
  this.off=function(action,callback){
    if(typeof that.actions[action]=="undefined") return;
    var index = that.actions[action].indexOf(callback);
    if(index>-1)
      that.actions[action].splice(index,1);
    console.log(that.actions);
  }

  this.onRep=function(ev){
    var d = ev.target.data;
  }

  this.init=function(){
    this.r.addEventListener('DOMSubtreeModified',that.onRep,false);
  }
}
Comm.version='0.1.0';
