function mainZMov(){
  var that=this;
  this.prop={

  }


// vvv EVENTS vvv
  this.initEvents=function(){
    $('#hiddenData').bind("DOMSubtreeModified",function(){
      that.onDataChange();
    });
  }

  this.onDataChange=function(){
    alert("content changed");
  }

}
