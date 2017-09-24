var express = require("express");
var mongoose = require("mongoose");
var url = "mongodb://amazoneastdatabase:wg7CsIy5zQKItBM4@database-shard-00-00-esilf.mongodb.net:27017,database-shard-00-01-esilf.mongodb.net:27017,database-shard-00-02-esilf.mongodb.net:27017/test?ssl=true&replicaSet=database-shard-0&authSource=admin";

mongoose.connect(url);
var db = mongoose.connection;

db.on('error', () => console.log('ERROR!'));
db.on('connected',()=> console.log("connnection established"));

var User = require('./server/models/user.js');
var Image = require('./server/models/image.js');

User.find({}, (err, data) => {
	console.log(err || data)
});
Image.find({}, (err, data) => {
	console.log(err || data)
});

/*User.remove({}, function(err, res){
    if (err) {
        console.log("Error:" + err);
    }
    else {
        console.log("Res:" + res);
    }
})*/

/*var image = new Image({
	creatorName: "S",
	url: "https://i.ytimg.com/vi/nomNd-1zBl8/maxresdefault.jpg",
	tital: "Dog",
	Like: 4
});

image.save((err, res) => {
	if (err) {
		console.log("Error:" + err);
	}
	else {
		console.log("Res:" + res);
	}
});
*/

/*var user = new User({
	username: "Sun",
	password: "123",
	collections: []
});

user.save((err, res) => {
	if (err) {
		console.log("Error:" + err);
	}
	else {
		console.log("Res:" + res);
	}
});*/