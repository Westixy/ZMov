var fs = require('fs');
var exec = require('child_process').exec;
var version=process.argv[2];

var id = "zmov-ext-x"/*+version*/+"@westixy";

console.log('version : '+version);
console.log('id : '+id);

var fpath='./package.json';
fs.readFile(fpath,'utf8', function (err,data) {
  if (err) return console.log(err);
  var json = JSON.parse(data);
  json.version=version;
  json.id=id;
  fs.writeFile(fpath, JSON.stringify(json), function (err) {
    if (err) return console.log(err);
    exec('jpm xpi',function(error, stdout, stderr) {
      console.log('\nstdout: \n' + stdout);
      console.log('stderr: \n' + stderr);
      if (error !== null) {
          console.log('exec error: ' + error);
      }
      exec('node ../signaddon/index.js '+version,function(error, stdout, stderr) {
        console.log('\nstdout: \n' + stdout);
        console.log('stderr: \n' + stderr);
        if (error !== null) {
            console.log('exec error: ' + error);
        }
      });
    });
  });
});
