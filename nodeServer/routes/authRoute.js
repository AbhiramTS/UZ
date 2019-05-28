const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/user');
require('../config/passport_setup')(passport);
const keys = require('../config/keys');
var jwt = require('jsonwebtoken');

router.post('/register', function(req, res) {
    if (!req.body.name|| !req.body.password) {
      res.json({success: false, msg: 'Please pass all required fields.'});
    } else {
      var newUser = new User({
        userId : "",
        name : req.body.name,
        email: req.body.email,
        password: req.body.password,
        dob : req.body.dob,
        gender : req.body.gender,
        articles : []
      });
      // save the user
      newUser.save(function(err, user) {
        if (err) {
          return res.json({success: false, msg: 'Username already exists.'+err});
        }
        //res.send(user);
        res.json({success: true, msg: 'Successful created new user.'});
      });
    }
  });

  router.post('/login', function(req, res) {
    User.findOne({
      email: req.body.email
    }, function(err, user) {
      if (err) throw err;
  
      if (!user) {
        res.status(401).send({success: false, msg: 'Authentication failed. User not found.'});
      } else {
        userData = {name: user.name, userId: user.userId, email: user.email, dob: user.dob, gender: user.gender};
        // check if password matches
        user.comparePassword(req.body.pwd, function (err, isMatch) {
          if (isMatch && !err) {
            // if user is found and password is right create a token
            var token = jwt.sign(user.toJSON(), keys.secret);
            // return the information including token as JSON
            res.json({success: true, token: token, usrdata: userData});
          } else {
            res.status(401).send({success: false, msg: 'Authentication failed. Wrong password.'});
          }
        });
      }
    });
  });

  getToken = function (headers) {
    if (headers && headers.authorization) {
      var parted = headers.authorization.split(' ');
      if (parted.length === 2) {
        return parted[1];
      } else {
        return null;
      }
    } else {
      return null;
    }
  };

  


module.exports = router;