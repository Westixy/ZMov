/*

8888888 888
  888   888
  888   888
  888   888888 .d88b.  88888b.d88b.
  888   888   d8P  Y8b 888 "888 "88b
  888   888   88888888 888  888  888
  888   Y88b. Y8b.     888  888  888
8888888  "Y888 "Y8888  888  888  888

*/

function ItemZMov(data){
  var that=this;
  this.css={
    item:{
      parent:"#cnt-movieList",
      container:".cnt-movieItem",
      thumbnails:".cnt-thumnails",
      miniTxt:".cnt-miText",
      title:".miTitle",
      name:".miName",
      date:".miDate"
    },
    full:{
      container:"#cnt-movieCard",
      img:"#cnt-movieCard > div > img",
      cntInfo:".cnt-textInfo",
      title:".movieTitle",
      rawText:".preRawText",
      cntDesc:".cnt-desc",
      cntAct:".cnt-acteurs",
      cntMore:".cnt-moreinfo",
      desc:"#txt-desc",
      acteurs:"#txt-acteurs",
      openit:"#a-path",
      more:"#cnt-pinfo"
    }
  };

  this.data={
    title:"",
    fname:"",
    date:"",
    acteurs:[],
    genreids:[],
    more:"",
    id:"",
    imgSrcBig:"",
    imgSrcSmall:"",
    path:''
  }

  this.tested=false;
  this.finded=false;
  this.lastUpdate=0;
  this.dontUpdate=false;

  this.setData=function(data){
    that.data.title=data.title;
    that.data.fname=data.fname||'';
    that.data.date=data.date;
    that.data.acteurs=data.acteurs||[];
    that.data.genreids=data.genreids||[];
    that.data.more=data.more;
    that.data.id=data.id;
    that.data.desc=data.desc;
    that.data.imgSrcBig=data.imgSrcBig;
    that.data.imgSrcSmall=data.imgSrcSmall;
    that.data.path=data.path||'';
  }

  this.includeToList=function(){
    var iB='<div data-itemid="'+that.data.id+'" class="'+n(that.css.item.container)+'">';
    iB+='<div class="'+n(that.css.item.thumbnails)+'">';
    iB+='    <img src="'+that.data.imgSrcSmall+'" alt="loading '+that.data.title+'" />';
    iB+='  </div>';
    iB+='  <div class="'+n(that.css.item.miniTxt)+'">';
    iB+='    <div class="'+n(that.css.item.title)+'">';
    iB+='      '+that.data.title;
    iB+='    </div>';
    iB+='    <div class="'+n(that.css.item.name)+'">';
    iB+='      '+that.data.fname;
    iB+='    </div>';
    iB+='    <div class="'+n(that.css.item.date)+'">';
    iB+='      '+that.data.date;
    iB+='    </div>';
    iB+='  </div>';
    iB+='</div>';
    $(that.css.item.parent).append(iB);
  };

  this.removeFromList=function(){
    var me = $(that.css.item.parent+" [data-itemid=\""+that.data.id+"\"]");
    if (typeof me!='undefined'){
      me.remove();
    }
  }

  this.updateCard=function(){
    $(that.css.full.img).attr("src",that.data.imgSrcBig);
    $(that.css.full.title).text(that.data.title);
    $(that.css.full.desc).html(that.data.more);
    var m="";
    that.data.acteurs.forEach(function(act){
      m+=act+'<br>';
    });
    $(that.css.full.acteurs).html(m);
    $(that.css.full.more).html(that.data.none);
    $(that.css.full.openit).attr('data-path',that.data.path)
  };

  this.match = function(text){
    //TODO : match avec this.data return true or false
    // si titre, acteurs et date son remplis cela doit matcher avec les 3
    // si titre, acteurs sont remplis il doit matcher avec les 2
    // etc...
    //text : input brute
    var titre = that.data.title;
    var acteurs = that.data.acteurs; // thats an ARRAY !
    var date = that.data.date.replace('-',''); // "2013-03-21"

    var output = false;

    if(text.indexOf(":") != -1){

    var outputActor = false;
    var outputName = false;
    var outputDate = false;

    var parameters = text.split(';');


    var actors = '';
    var names = '';
    var dates = '';


      // now 2 first characters of each cell are the parameters exemple parameters[0] => "a:John Sotillo"

      // for each parameters
      for(var i = 0; i < parameters.length; i++){

        parameters[i] = parameters[i].split(":"); // split the parameter char and the value

        // all parameters are reparted on a specific variable
        switch(parameters[i][0]){
          case "a" : actors = parameters[i][1];
            break;
          case "n" : names = parameters[i][1];
            break;
          case "d" : dates = parameters[i][1];
            break;
        }
      }

      // treatment of data tables of parameters (internal function)
      var stockDataSearched = function(tables){
        var table; // array

        if(tables.indexOf("|") != -1){ // if OR treatment has been request
          var searchTable = tables.split("|");

          table = new Array();

          for(var i = 0; i < searchTable.length; i++){

            table[table.length] = new Array();

            if(searchTable[i].indexOf("&") != -1){ // if AND treatment has been request

              tmp = searchTable[i].split("&");
              for(var d = 0; d < tmp.length; d++){
                table[i].push(tmp[d]);
              }

            }else{
              table[i].push(searchTable[i]);
            }
          }
        }else if(tables.indexOf("&") != -1){ // if AND treatment only has been request
          table = new Array;
          table[0] = tables.split("&");
        }else{
          table = new Array;
          table[0] = [tables,'']; //here there is a simple string data in actors so we put an empty cell because actor have to be an array
        }
        return table;
      }

      // data treatments
      var actor = stockDataSearched(actors); // array
      var name = stockDataSearched(names); // array
      var dateB = stockDataSearched(dates); // array


      if(actor[0][0] != ''){
        // loop for artists ===========================================================
        for(var i = 0; i < actor.length; i++){ // for each OR clause
          for(var c = 0; c < actor[i].length; c++){ // for each actor name
            if(actor[i][c] != ""){ // if the actor cell isn't empty
              for(var d = 0; d < acteurs.length; d++){ // for each actor name in the array
                if(acteurs[d].toLowerCase().indexOf(actor[i][c].toLowerCase()) != -1){ // if actor searched match to actor stocked
                  outputActor = true;
                  break;
                }else{
                  outputActor = false;
                }
              }
              if(outputActor == false){
                break;
              }
            }
          }
          if(outputActor != false){
            break;
          }
        }
      }else{
        outputActor = true;
      }

      if(name[0][0] != ''){
        // loop for movie names ====================================================
        for(var i = 0; i < name.length; i++){ // for each OR clause
          for(var c = 0; c < name[i].length; c++){ // for each movie name
            if(name[i][c] != ""){ // if the movie name cell isn't empty
              //console.log(titre);
                if(titre.toLowerCase().indexOf(name[i][c].toLowerCase()) != -1 ){
                  outputName = true;
                }else{
                  outputName = false;
                }
              if(outputName == false){
                break;
              }
            }
          }
          if(outputName != false){
            break;
          }
        }
      }else{
        outputName = true;
      }

      if(dateB[0][0] != ''){
        // loop for dates ==========================================================
        for(var i = 0; i < dateB.length; i++){
          for(var c = 0; c < dateB[i].length; c++){
            if(dateB[i][c] != ""){
              if(dateB[i][c].charAt(0) == '<'){
                if(date < dateB[i][c].substr(1, 8)){
                  outputDate = true;
                }else{
                  outputDate = false;
                  break;
                }
              }else if(dateB[i][c].charAt(0) == '>'){
                if(date > dateB[i][c].substr(1, 8)){
                  outputDate = true;
                }else{
                  outputDate = false;
                  break;
                }
              }else if(dateB[i][c].charAt(0) == '='){
                if(date == dateB[i][c].substr(1, 8)){
                  outputDate = true;
                  break;
                }
              }
            }
          }
          if(outputDate !=false){
            break;
          }
        }
      }else{
        outputDate = true;
      }

      if(outputActor == true && outputName == true && outputDate == true){
        output = true;
      }else{
        output = false;
      }
    }else{ // no parameters !
      for(var i = 0; i < acteurs.length; i++){
        if(acteurs[i].toLowerCase().indexOf(text.toLowerCase()) != -1){
          output = true;
          break;
        }else{
          output = false;
        }
      }
      if(titre.toLowerCase().indexOf(text.toLowerCase()) != -1){
        output = true;
      }
    }
    return output;

  }

  this.setTitle=function(title){
    this.dontUpdate=true;
    this.data.title=title;
  }

  if(typeof data != 'undefined')this.setData(data);

  /*this.init(
    {
      title:"My title",
      fname:"ma_fname.waw",
      date:"10.10.2016",
      acteurs:["John", "CENA", "Cartman"],
      more:"<small>noMore</small><strong> Héhéhé</strong>",
      id:"0",
      desc:"MariaDb on fire",
      imgSrcBig:"http://images.fan-de-cinema.com/affiches/large/65/67886.jpg",
      imgSrcSmall:"http://s3images.coroflot.com/user_files/individual_files/projects/491612_1284695_cover_ps27yjaxigno7jzp2dhx.jpg"
    }
  );*/

}
