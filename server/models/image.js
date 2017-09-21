var mongoose = require('mongoose');

var imageSchema = mongoose.Schema({
	creatorName: String,
	url: String,
	tital: String,
	Like: Number
})

module.exports = mongoose.model('Image', imageSchema);