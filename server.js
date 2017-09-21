var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var passport = require('passport');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var compression = require('compression');

var url = "mongodb://amazoneastdatabase:wg7CsIy5zQKItBM4@database-shard-00-00-esilf.mongodb.net:27017,database-shard-00-01-esilf.mongodb.net:27017,database-shard-00-02-esilf.mongodb.net:27017/test?ssl=true&replicaSet=database-shard-0&authSource=admin";
var app = express();
var router = require("./server/router.js");/////////////
mongoose.connect(url);
var db = mongoose.connection;

app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser('fccpinterest'));
app.use(bodyParser());
app.use(session({secert:'fccpinterest', resave: true, saveUninitialized: false}));
app.use(passport.initialize());
app.use(passport.session());
app.use(compression());

db.on('error', ()=> console.log('Database connection fail'));
db.on('connected', ()=>{
	console.log('Database connected');
	//require('./server/passport.js')(passport);
	router(app, passport);
});

app.set('port', process.env.PORT || 5000);
app.listen(app.get('port'), ()=>{
	console.log('listening '+ app.get('port'));
});
