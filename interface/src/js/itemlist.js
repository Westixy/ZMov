/*

8888888 888                          888      d8b          888
  888   888                          888      Y8P          888
  888   888                          888                   888
  888   888888 .d88b.  88888b.d88b.  888      888 .d8888b  888888
  888   888   d8P  Y8b 888 "888 "88b 888      888 88K      888
  888   888   88888888 888  888  888 888      888 "Y8888b. 888
  888   Y88b. Y8b.     888  888  888 888      888      X88 Y88b.
8888888  "Y888 "Y8888  888  888  888 88888888 888  88888P'  "Y888

*/

function ItemListZMov(){
  var that=this;
  this.cnt="#cnt-movieList";
  this.item=".cnt-movieItem";
  this.list=[];
  this.showed=[];

  this.addItem=function(data){
    var mitem=new itemZMov(data);
    that.list.push(mitem);
    data.id=that.list.lastIndexOf(mitem);
    mitem.data.id=data.id;

  }

  this.addItemToList=function(data){
    that.addItem(data);
    that.itemToList(data.id);
  }

  this.itemToList=function(id){
    that.showed[id]=that.list[id];
    that.list[id].includeToList();
  }

  this.rmItemFromList=function(id){
    var els = $(that.cnt+" "+that.item).toArray();
    els.forEach(function(item,ind){
      var it = $(item);
      if(it.attr("data-itemid")==id){

        that.showed.splice(id,1);
        $(item).remove();
      }
    });
  }

  this.rmItem=function(id){
    that.rmItemFromList(id);
    that.list.splice(id,1);
  }

  this.resetShowedList=function(){
    that.showed=[];
    $(that.cnt).html("");
  }

}
