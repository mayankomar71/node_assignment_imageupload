var Busboy = require('busboy');
var path = require('path');
var fs = require('fs');
var image=require('../model/model')
var RandomString = require('randomstring');

exports.postImage = (req, res) => {
    var busboy = new Busboy({ headers:req.headers });
    
    busboy.on('file', (fieldname, file, filename) => {
        file_name=RandomString.generate(7)+".png"
        var filepath = path.join('./temp', file_name);
        console.log('Uploading your file to: ' + filepath);
        file.pipe(fs.createWriteStream(filepath));
        const data = new image({
            url:filepath,
            fileName:file_name
     
         })
         data.save().then((response)=>
         {
             res.json("Done File uploading")
         }).catch((err)=>
         {
             res.json({message:err})
         })
         
    });
    busboy.on('finish', function() {
        console.log('Upload complete');
      });
    return req.pipe(busboy);

}
// exports.findImage=(req,res)=>
// {
//     image.find({'url':req.params.url}).then((response)=>
//     {
//         res.send(response)

//     })
// }