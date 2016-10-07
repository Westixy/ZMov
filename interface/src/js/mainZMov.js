function mainZMov(){
  var that=this;
  this.prop={

  }


// vvv EVENTS vvv
  this.initEvents=function(){
    $('#hiddenData').bind("DOMSubtreeModified",that.onDataChange);
    $(window).on("resize",that.onWinResize);
    $('#in-search').on("change",that.onSearchChange);
    $('#cnt-movieList').on('click','.cnt-movieItem',that.onItemClick);
  }

  this.onDataChange=function(){
    console.log("content changed");
  }

  this.onWinResize=function(){
    console.log("WinResized");
  }

  this.onSearchChange=function(){
    console.log("onSearchChange");
  }

  this.onItemClick=function(ev){
    var elem = ev.currentTarget;
    console.log("onItemClick");
    console.log($(elem).attr('data-itemid'));
  }

}
