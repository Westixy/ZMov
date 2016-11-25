var c = new CommEmmiter('ext','#FromWeb','#FromExt');
c.init();

//alias
var cemit=function(action,args){c.emit('web',action,args);}

// from ext
self.port.on('flist_ok', function(mjson) {
  cemit('flist_ok',mjson);
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
  cemit('sync_ok');
});

c.on('DEBUG', function(arg){
  cemit('DEBUG',arg);
});
