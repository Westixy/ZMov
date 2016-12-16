/* Created by Esteban Sotillo <westixy@gmail.com>
      Name : CommEmmiter
      Version : 0.1.0
      date : 18.11.2016
*/

/*
 * CommEmmiter est une classe immitant le fonctionnnement d'un emmitter
 * en node JS. cependant, il travaille sur deux divs affin de pouvoir
 * communiquer entre l'extention firefox et le navigateur.
 *
 * Il est nécessaire de faire un init() pour que l'evenement d'écoute sur
 * la div s'enclenche.
 *
 * chaque éléments de communication à un id , une div de réception (celle ou
 * il va écouter les changements qui opèrent), un div d'emission (qui va
 * recevoir les données a transmettre et qui seras aussi ecoutée par le
 * deuxieme Comm (ou plus si il y en a plus :D)
 *
 * Etant donné que chaque Comm à un id particulier, il est obligatoire de dire
 * à qui l'on veut envoyer un emit. (emit(who,what[,arg])) (arg est une seule
 * variable)
 *
 * NB : éviter les fonctions anonymes dans les .on, il n'est pas possible de
 *      faire des .off après si elles n'ont pas de nom (à améliorer :) )
 *
 * ENJOY IT ;)
 * Westixy
 *
**/

/* LICENCE WTFPL

  DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
          Version 2, December 2004

  Copyright (C) 2004 Sam Hocevar <sam@hocevar.net>

  Everyone is permitted to copy and distribute verbatim or modified
  copies of this license document, and changing it is allowed as long
  as the name is changed.

  DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
  TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION

  0. You just DO WHAT THE FUCK YOU WANT TO.

*/

/**
 * CommEmmiter - Objet de communication / evenements sevent a communiquer entre une extention et un page web
 *
 * @param  {string} id     identifiant de l'objet (servant d'adresse)
 * @param  {string} recive css déterminant la div de réception des données
 * @param  {string} send   css déterminant la div d'envoi des données <small>(ne peuvent pas être les même)</small>
 */
function CommEmmiter(id,recive,send){
  var that=this;

  this.css={
    r:recive,
    s:send
  }
  this.r=document.querySelector(that.css.r);
  this.s=document.querySelector(that.css.s);


  /**
   * l'identifian de l'objet (servant d'adresse)
   */
  this.id=id;

  this.actions={};

  this.sample={
    id:null,
    from:id,
    action:null,
    vars:null
  }



  /**
   * this.emit - envoi un événement pour un autre commEmiter avec une ection et des possibles variables
   *
   * @param  {string} who  l'id du commEmiter a contacter
   * @param  {string} action l'action que le commEmiter contacté doit executer
   * @param  {rainbow} vars   <em>[optionnel]</em> les données a envoyer
   */
  this.emit=function(who,action,vars){
    that.sample.id=who;
    that.sample.action=action;
    that.sample.vars=(typeof vars!="undefined")?vars:null;
    that.s.innerHTML=encodeURIComponent(JSON.stringify(that.sample));
  }


  /**
   * this.on - permet d'écouter des actions qui serait envoyées par un autre commEmiter <br>
   * plusieurs appels pour la meme action sont possibles et se feront donc les unes après les autres
   *
   * @param  {string} action   nom de l'action auquel l'emiter doit réagir
   * @param  {function} callback la fonction a executer lorsque un emit est destiné a cet objet et cette action
   */
  this.on=function(action,callback){
    if(typeof that.actions[action]=="undefined")that.actions[action]=[];
    if(that.actions[action].indexOf(callback)<0)
      that.actions[action].push(callback);
  }

  /**
   * this.off - désactive l'ecoute des événements fait par this.on
   *
   * @param  {string} action nom de l'action auquel l'emiter devait réagir
   * @param  {function} callback la fonction que devait executer lorsque un emit était destiné a cet objet et cette action
   */
  this.off=function(action,callback){
    if(typeof that.actions[action]=="undefined") return;
    var index = that.actions[action].indexOf(callback);
    if(index>-1)
      that.actions[action].splice(index,1);
  }

  this.onRep=function(ev){
    let text=decodeURIComponent(ev.target.innerHTML);
    var d = JSON.parse(text);
    if(d.id!=that.id) return;
    if(typeof that.actions[d.action]=="undefined") return;
    for(var i=0 ; i<that.actions[d.action].length ; i++){
      that.actions[d.action][i](d.vars);
    }
  }


  /**
   * this.init - initialise l'écoute sur les div de réceptions et d'envoi.
   */
  this.init=function(){
    that.r=document.querySelector(that.css.r);
    that.s=document.querySelector(that.css.s);
    that.r.addEventListener('DOMSubtreeModified',that.onRep);
  }
}
CommEmmiter.version='0.1.0';
