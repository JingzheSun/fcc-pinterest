var express = require('express');
var Image = require('./models/image.js');
var User = require('./models/user.js');
var path = require('path');

module.exports = function(app, passport){
	app.get('/logout', (req, res)=>{
		req.logout();
		res.redirect('/#/');
	})

	app.get('*', function (req, res) {
	   res.sendFile(path.resolve(__dirname, 'index.html'));
	});

	app.post('/', (req, res) =>{
		let login = req.isAuthenticated();
		let user = {};
		if (login){
			user = req.user;
		}
		Image.find({}, (err, data) => {
			if (err)
				console.log(err);
			res.send({images:data, login: login, user: user})
		});
	});

	app.post('/login',(req, res, next) => {
		var info = req.body;
		if (info.submit == 'Login'){
			passport.authenticate('local', {
		        successRedirect: '/#/collections',
		        failureRedirect: '/#/main/login/fail'
		    })(req, res, next);
		} else{
			User.findOne({username:info.username}, (err,data) =>{
				if (err){
					console.log(err);
					res.redirect('/#/')
				} else if (data){
					res.redirect('/#/main/login/registerfail')
				} else {
					var user = new User({
						username: info.username,
						password: info.password,
						collections: []
					});
					user.save((err, resq) => {
						if (err) {
							console.log("Save fail");
						}else {
							console.log("Saved");
							passport.authenticate('local', {
						        successRedirect: '/#/collections'
						    })(req, res, next);
						}
					});
				}
			})
		}
	})

	app.post('/add',(req, res) => {
		var info = req.body;
		console.log(req.user)
		var image = new Image({
			creatorName: req.user.username || 'GUEST',
			url: info.url,
			title: info.title,
			Like: 0
		});
		image.save((err, resq) => {
			if (err) {
				console.log("Save fail");
			}else {
				console.log("Saved");
			}
		});
		res.redirect('/')
	});

	app.post('/collections', (req, res) => {
		let user = req.body.user;
		User.findByIdAndUpdate(user._id, { $set: {collections: user.collections}}, (err,data)=>{
			res.send(data)
		})
	});

	app.post('/thumb', (req, res) => {
		let id = req.body.imageId;
		Image.update({_id: id}, { $inc: {Like: 1}}, (err,data)=>{
			res.send(data)
		})
	});
}