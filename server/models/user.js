var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    username: {
        id : String,
        userName : String,
    },
    stars: [String]
});

module.exports = mongoose.model('User', userSchema);