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


/**
 * ItemListZMov - Conteneur de tous les items
 */
function ItemListZMov(){
  var that=this;
  this.cnt="#cnt-movieList";
  this.item=".cnt-movieItem";

  /**
   *   la liste de tous les objets
   */
  this.list=[];
  this.lsforIndexOf=[];

  /**
   *   la liste des id des objets affichés
   */
  this.showed=[];

  /**
   * this.add - Ajoute un item a la liste (objet)
   *
   * @param  {ItemZMov} item l'objet à ajouter à la liste
   * @return {int} l'id de l'item créé
   */
  this.add=function(item){
    that.list.push(item);
    that.lsforIndexOf.push(item.data.fname);
    item.data.id=that.list.lastIndexOf(item);
    return item.data.id;
  }

  /**
   * this.addItem - Ajoute un item a la liste (data)
   *
   * @param  {objet} data les données à utiliser pour l'ajout d'un item (voir ItemZMov.setData)
   */
  this.addItem=function(data){
    var mitem=new ItemZMov(data);
    that.add(mitem);
  }

  /**
   * this.addItemFromDump - Ajoute un item a la liste (fromDump)
   *
   * @param  {objet} data Les données de l'objet ItemZMov dumpées a insérer dans l'item
   * @return {ItemZMov} l'objet ItemZMov créé
   */
  this.addItemFromDump=function(data){
    var mitem=new ItemZMov();
    mitem.data=data;
    that.add(mitem);
    return mitem;
  }


  /**
   * this.indexOfx - permet de récupérer l'id d'un item selon son nom de fichier
   *
   * @param  {string} fname le nom du fichier
   * @return {id}       l'index du fichier
   */
  this.indexOfx=function(fname){
    return this.lsforIndexOf.indexOf(fname);
  }

  /**
   * this.getFromFname - récupère l'item depuis son nom de fichier
   *
   * @param  {string} fname le nom du fichier correspondant à l'ItemZMov voulu
   * @return {ItemZMov}       l'item voulu selon son nom de fichier
   */
  this.getFromFname=function(fname){
    return this.get(this.indexOfx(fname));
  }

  /**
   * this.get - récupère l'item depuis son id
   *
   * @param  {int} id  l'id de l'item
   * @return {ItemZMov} l'item voulu selon son id
   */
  this.get=function(id){
    return this.list[id];
  }

  /**
   * this.addItemToList - Ajoute un item à la liste puis l'affiche avec les données du film  (insertion dans la liste réel et visuel)
   *
   * @param  {objet} data  les données du film (voir ItemZMov.addItemToList)
   */
  this.addItemToList=function(data){
    that.addItemToList(data);
    that.itemToList(data.id);
  }

  /**
   * this.itemToList - Ajoute l'item (selon l'id) a la liste visuelle
   *
   * @param  {int} id identifiant de l'objet
   */
  this.itemToList=function(id){
    that.showed[id]=that.list[id];
    that.list[id].includeToList(false);
  }

  /**
   * this.rmItemFromList - Supprime un Item de la liste visuel
   *
   * @param  {int} id id de l'item a retirer de la liste visuel
   */
  this.rmItemFromList=function(id){
    var visualList = $(that.cnt+" "+that.item).toArray();
    visualList.forEach(function(item,ind){
      var it = $(item);
      if(it.attr("data-itemid")==id){

        that.showed.splice(id,1);
        $(item).remove();
      }
    });
  }

  /**
   * this.match - sélection et affichage des items selon le pattern (voir ItemZMov.match)
   *
   * @param  {string} pattern pattern de sélection (voir ItemZMov.match)
   */
  this.match=function(pattern){
    that.resetShowedList()
    for(var i=0; i<that.list.length ; i++){
      if(that.list[i].match(pattern)){
        that.itemToList(i);
      }
    }
  }

  /**
   * this.rmItem - Supprime un item de la liste réel et affichée
   *
   * @param  {int} id id de l'item a supprimer
   */
  this.rmItem=function(id){
    that.rmItemFromList(id);
    that.list.splice(id,1);
  }

  /**
   * this.resetShowedList - réinitialise la liste affichée et supprime ce qu'il y a dans la div d'affichage.
   */
  this.resetShowedList=function(){
    that.showed=[];
    $(that.cnt).html("");
  }

}
