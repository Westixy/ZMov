var c = new CommEmmiter('ext','#FromWeb','#FromExt');
c.init();

//alias
var cemit=function(action,args){c.emit('web',action,args);}


// from ext
self.port.on('flist_ok', function(mjson) {
    c.emit('web','flist_ok',mjson);
});



// from web
c.on('flist_get',function(){
  self.port.emit('flist_get');
});

c.on('DEBUG', function(arg){
  cemit('DEBUG',arg)
});
