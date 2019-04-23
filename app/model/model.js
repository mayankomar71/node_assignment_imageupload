var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var image_Schema = new Schema({
	url: {type: String,required: true},
	fileName : {type: String,require: true},
});

var image_model = mongoose.model('image_model', image_Schema);

module.exports = image_model;
