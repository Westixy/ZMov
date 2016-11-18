var c = new CommEmmiter('ext','#FromWeb','#FromExt');
c.init();



// from ext
self.port.on('flist_ok', function(mjson) {
    c.emit('web','flist_ok',mjson);
});



// from web
c.on('flist_get',function(){
  self.port.emit('flist_get');
});
