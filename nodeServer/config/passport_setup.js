var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

// load up the user model
var User = require('../models/user');
var config = require('../config/keys');

module.exports = function(passport) {
  var opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
  opts.secretOrKey = config.secret;
  passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    User.findOne({id: jwt_payload.id}, function(err, user) {
          if (err) {
              return done(err, false);
          }
          if (user) {
              done(null, user);
          } else {
              done(null, false);
          }
      });
  }));
};
   
/*
passport.use('google',
    new GoogleStrategy(//options for google strategy
        {
            callbackURL: '/auth/google/redirect',
            clientID : keys.google.clientID,
            clientSecret: keys.google.clientSecret
        },
        (accessToken, refreshToken, profile, done)=>{//passport callback
            User.findOne({googleId: profile.id}).then((curUser)=>{
                if(curUser){
                    //console.log(profile);
                    //console.log('User ' + curUser.username+ ' is logged in');
                    done(null, curUser);//, { message: 'Welcome '+user.username+'. Logged in using Google account', mcolor: 'green' });
                }
                else{
                    new User({
                        username : profile.displayName,
                        googleId : profile.id,
                        email : profile.emails[0].value,
                        birthday : profile._json.birthday,
                        gender: profile.gender
                    }).save().then((newUser)=>{
                        //console.log(newUser + 'registered in db');
                        done(null, newUser, { message: 'Account successfully created using Google account', mcolor: 'green' });
                    })
                }
            });
        }
    ));
*/
