
/**
 * AjaxSender - Object servant de gestion à l'envoi des requetes ajax pour l'item
 *
 * @param  {Object} options définition des options :<br> url , onsendall, ondone, onfail, onresult, onend
 */
function AjaxSender(options){
  var that=this;


  /**
   * Emplacement des données à envoyer (le nom des fichiers)
   */
  this.data=[]; // ["fname1.avi",'fname2.avi',...]



  var opt=options||{
    url:'',
    onsendall:function(){},
    ondone:function(){},
    onfail:function(){},
    onresult:function(){},
    onend:function(){}
  };

  /**
   *   l'url de la requete ajax
   */
  this.url=opt.url;

  /**
   * le callback lors de l'envoi de toutes les requetes
   */
  this.onSendAll=opt.onsendall;

  /**
   * le callback lorsque une requete a réussi
   */
  this.onDone=opt.ondone;

  /**
   * le callback lorsque la requete a eu une erreur
   */
  this.onFail=opt.onfail;

  /**
   * le callback lorsque une requete est terminee (réussi ou pas)
   */
  this.onResult=opt.onresult;

  /**
   * le callback lorseque toutes les requètes sont terminées
   */
  this.onEnd=opt.onend;


  /**
   *  emplacement pour les données a envoyer en ajax (objet {} )
   *  <strong>ne s'utilise que en debug</strong>
   */
  this.dts='';


  /**
   * temps d'attente entre 2 requetes
   * max 40 requetes par 10s
   * 3 requetes par films sont generees en php
   */
  this.timewait=1000;

  /**
   *  Etat si toutes les requete sont terminée, l'état passe a true
   */
  this.ended=true;

  this.current=0;
  this.finded=0;
  this.nbrended=0;

  this.abort=false;


  /**
   * this.send - envoi d'une requete
   *  <strong>ne s'utilise que en debug</strong>
   */
  this.send=function(){
    that.ended=false;
    that.rq=$.ajax({
      url:that.url,
      method:'POST',
      data:{entry:that.dts}
    });
    this.rq.done(function(response){
      that.finded++;
      that.onDone(response);
      that.onRes();
    });
    this.rq.fail(function(jqxhr, status){
      that.onFail(jqxhr,status);
      that.onRes();
    });
  }

  this.onRes=function(){
    that.nbrended++;
    that.onResult();
    if(that.finded==that.tot()){
      that.ended=true;
      that.onEnd();
    }
  }

  this.next=function(){
    if(that.last==true)return false;
    var rep=true;
    if(that.current>=that.data.length-1){that.last=true;rep=false;}
    that.dts=that.data[that.current];
    that.current++;
    that.send();
    return rep;
  }

  /**
   * this.sendAll - Envoies toutes les requètes préparées
   */
  this.sendAll=function(){
    if(that.data.length<=0) return; // il n'y a rien a envoyer
    that.onSendAll();
    that.current=0;
    that.finded=0;
    that.nbrended=0;
    that.abort=false;
    //while(this.next()){}
    var inter = setInterval(function(){
      if(that.abort || !that.next()){
        clearInterval(inter);
      }
    }, that.timewait);
  }


  /**
   * this.setData - définition des données qui vont etre envoyee en ajax au fichier php
   *
   * @param  {array} data tableau de nom de fichiers ([john-cena.avi,...])
   * @return {boolean} retourne true si l'objet n'est pas déjà en train d'envoyer une serie de requete et false si il est déja en train d'envoyer<br> true -> les data ont changés<br>false -> les data n'ont pas changés
   */
  this.setData=function(data){
    if(that.ended==true){
      that.data=data;
      that.current=0;
      that.finded=0;
      that.last=false;
      return true;
    }
    return false;
  }


  /**
   * this.abortAll - annule l'envoi de toutes les requetes  et execute l'evenement onEnd
   */
  this.abortAll=function(){
    that.abort=true;
    that.onEnd();
  }


  /**
   * this.tot - obtient le nombre de requetes que l'objet va envoyer lors d'un sendAll  
   *
   * @return {int}  le nombre total de requetes que l'objet va effectuer (data.length)
   */
  this.tot=function(){
    return that.data.length;
  }
}
