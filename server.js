var path = require('path');
var fs = require('fs');
var os = require('os');
var express = require('express');
var app = express();
var Busboy = require('busboy');

app.post('/image', function (req, res) {
   console.log(req );
    var busboy = new Busboy({ headers: req.headers });
    busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
      var saveTo = path.join('./temp', filename);
      console.log('Uploading: ' + saveTo);
      console.log(saveTo);
      file.pipe(fs.createWriteStream(saveTo));
    });
    busboy.on('finish', function() {
      console.log('Upload complete');
      res.writeHead(200, { 'Connection': 'close' });
    });
    return req.pipe(busboy);

});

var server = app.listen(4000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('app running at', host, port)

});

