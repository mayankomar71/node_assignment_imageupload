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
exports.base64upload=function(req, res){
    var base64Data = req.body.image.replace(/^data:image\/(?:jpeg|jpg|JPEG|JPG|png|PNG);base64,/, "");
    var filename = RandomString.generate(7)
    let extension, lowerCaseData = base64Data.toLowerCase();
    if(lowerCaseData.indexOf('png') !== -1){
        extension = '.png'
    }else if(lowerCaseData.indexOf('jpg') !== -1){
        extension = '.jpg'
    }else if(lowerCaseData.indexOf('jpeg') !== -1){
        extension = '.jpeg'
    }
    fs.writeFile('./temp/' + filename + extension, base64Data, 'base64', function (err) {
        
        const data = new image({
            url:'/temp/' + filename + extension,
            fileName:filename
     
         })   
                
      

        data.save(function(err){
            if(err){
                res.json(err);
            }
        else
        {
            res.json('file uploaded using base64')
        }
        });
    });
}
// exports.findImage=(req,res)=>
// {
//     image.find({'url':req.params.url}).then((response)=>
//     {
//         res.send(response)

//     })
// }