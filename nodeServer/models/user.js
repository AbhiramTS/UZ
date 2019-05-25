const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let User = new Schema({
    userId : {type : String},
    name : {type : String},
    email : {type : String},
    pass : {type : String},
    articles : [{
                    title : {type : String},
                    link : {type : String}
                }]
},{
    collection : "userAccounts"
});

module.exports = mongoose.model('user', User);