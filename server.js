var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var passport = require('passport');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);
var compression = require('compression');

var url = "mongodb://amazoneastdatabase:wg7CsIy5zQKItBM4@database-shard-00-00-esilf.mongodb.net:27017,database-shard-00-01-esilf.mongodb.net:27017,database-shard-00-02-esilf.mongodb.net:27017/test?ssl=true&replicaSet=database-shard-0&authSource=admin";
var app = express();
var router = require("./server/router.js");/////////////
mongoose.connect(url);
var db = mongoose.connection;

if (process.env.REDISTOGO_URL){
    var url = require("url").parse(process.env.REDISTOGO_URL);
}

var options = {
    host: url.hostname || "127.0.0.1",
    port: url.port || 6379
};

app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser('fccpinterest'));
app.use(bodyParser());

/*app.use(session({
    secret: 'fccpinterest',
    resave: true,
  	saveUninitialized: true
}));*/
app.use(session({
    store: new RedisStore(options),
    secret: 'fccpinterest',
    resave: true,
  	saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(compression());

db.on('error', ()=> console.log('Database connection fail'));
db.on('connected', ()=>{
	console.log('Database connected');
	require('./server/passport.js')(passport);
	router(app, passport);
});

app.set('port', process.env.PORT || 5000);
app.listen(app.get('port'), ()=>{
	console.log('listening '+ app.get('port'));
});
