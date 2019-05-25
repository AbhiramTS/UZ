const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let Article = new Schema({
    artId : {type : String},
    link : {type : String},
    title : {type : String},
    author : {type : String},
    votes : [{
                    user : {type : String},
                    value : {type : Number}
                }]
},{
    collection : "articleStash"
});

module.exports = mongoose.model('article', Article);