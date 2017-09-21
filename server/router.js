var express = require('express');
var Image = require('./models/image.js');
var path = require('path');

module.exports = function(app, passport){
	app.get('/', (req, res)=>{
		res.render('index.html');
	});

	app.post('/', (req, res) =>{
		Image.find({}, (err, data) => {
			if (err)
				console.log(err);
			res.send(data)
		});
	});

	app.post('/add',(req, res) => {
		var info = req.body;
		var image = new Image({
			creatorName: "Sun",
			url: info.url,
			title: info.title,
			Like: 2  
		});
		image.save((err, res) => {
			if (err) {
				console.log("Save fail");
			}else {
				console.log("Saved");
			}
		});
		res.redirect('/')
	})

	app.use('*', (req, res)=>{
		res.sendFile(path.resolve(__dirname,'../public/index.html'));
	});
}