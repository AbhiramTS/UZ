const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

var User = new Schema({
    userId : {type : String},
    name : {type : String},
    email : {type : String},
    password : {type : String},
    dob : {type : Date},
    gender : {type : String},
    articles : [{
                    title : {type : String},
                    link : {type : String}
                }]
},{
    collection : "userAccounts"
});

User.pre('save', function (next) {
    console.log('hashing password');
    var user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                console.log(err);
                return next(err);
            }
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) {
                    console.log(err);
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});

User.methods.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};

/*
User.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

User.methods.validPassword = function(password) {
    if(this.password != null){
        return bcrypt.compareSync(password, this.password);
    }
    else{
        return false; 
    }
};*/

module.exports = mongoose.model('user', User);