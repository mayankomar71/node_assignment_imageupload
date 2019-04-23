var Busboy = require('busboy');
var path = require('path');
var fs = require('fs');

exports.post_image = (req, res) => {
    var busboy = new Busboy({ headers:req.headers });
    busboy.on('file', (fieldname, file, filename) => {
        var file_path = path.join('./image_fold', filename);
        console.log('Uploading: ' + file_path);
        file.pipe(fs.createWriteStream(file_path));
    });
    busboy.on('finish', () => {
        console.log('Image uploaded');

        res.writeHead(200, { 'Connection': 'close' });
        res.end("Done");
    });
    return req.pipe(busboy);

}