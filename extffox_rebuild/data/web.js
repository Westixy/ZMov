// CE FICHIER NE SERT QUE DE PONT AUX DONNEES

var c = new CommEmmiter('ext','#FromWeb','#FromExt');
c.init();

//alias
var cemit=function(action,args){c.emit('web',action,args);}

// from ext
self.port.on('flist_ok', function(mjson) {
  cemit('flist_ok',mjson);
});
self.port.on('sync_ok', function(arg){
  cemit('sync_ok',arg);
});
self.port.on('DEBUG', function(arg){
  cemit('DEBUG',arg);
});

// from web
c.on('flist_get',function(){
  self.port.emit('flist_get');
});
c.on('flist_set',function(arg){
  self.port.emit('flist_set',arg)
});
c.on('ext_set',function(arg){
  self.port.emit('ext_set',arg)
});
c.on('fopen',function(path){
  self.port.emit('fopen',path);
});


c.on('sync_get',function(){
  self.port.emit('sync_get');
});

c.on('DEBUG', function(arg){
  self.port.emit('DEBUG',arg);
});
