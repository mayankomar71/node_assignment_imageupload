module.exports=(app)=>{
    const imageupload=require('../controllers/controllers.js');
    app.post('/upload', imageupload.postImage);
    app.get('/image/:url',imageupload.findImage)
}