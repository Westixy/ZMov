var elements = document.querySelectorAll('div#hiddenjsondata');

self.port.on("loadjson", function(mjson) {
    var elem = elements[0];
    elem.textContent = JSON.stringify(mjson);
});