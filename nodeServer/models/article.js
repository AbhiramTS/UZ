const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let Article = new Schema({
    artId : {type : String},
    hash : {type : String},
    link : {type : String},
    img: {type : String},
    title : {type : String},
    author : {type : String},
    authorId : {type : String},
    text : { type : String},
    upVotes : {type : Number},
    downVotes : {type : Number},
    votes : [{ //unused
                    user : {type : String},
                    value : {type : Number}
                }]
},{
    collection : "articleStash"
});

module.exports = mongoose.model('article', Article);