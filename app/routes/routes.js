module.exports=(app)=>{
    const imageupload=require('../controllers/controllers.js');
    app.post('/upload', imageupload.postImage);
    app.post('/base64', imageupload.base64upload);
}