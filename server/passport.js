var LocalStrategy  = require('passport-local').Strategy;
var User = require('./models/user.js');

module.exports = function(passport) {
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    passport.use(new LocalStrategy(
        function(username, password, done) {
            process.nextTick(function() {
                User.findOne({ username : username }, function(err, user) {
                    if (err){
                        return done(err);
                    }
                    if (!user){
                        return done(null, false, { message: 'Username not exist'});
                    } else if (user.password != password) {
                        return done(null, false, { message: 'Incorrect password.' });
                    }
                    return done(null, user);
                });
            });
        }
    ));
};