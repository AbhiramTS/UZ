const express = require('express');
const router = express.Router();
const Article = require('../models/article');


router.post('/submit', function(req, res) {
  if (!req.body) { 
    res.json({success: false, msg: 'Please pass all required fields.'});
  } else {
    var newArticle = new Article({
      artId : req.body.artId,        
      hash : req.body.hash,             
      link : req.body.link,
      title: req.body.title,
      author: req.body.author,
      authorId: req.body.authorId,
      img: req.body.img,
      text: req.body.text,
      upVotes: req.body.upVotes,
      downVotes: req.body.downVotes,
      votes : []
    });
    // save the user
    newArticle.save(function(err) {
      if (err) {
        return res.json({success: false, msg: 'Something went wrong.'+err});
      }
      res.json({success: true, msg: 'Article submitted successfully'});
    });
  }
});

router.get('/getStream', function(req, res) {
  Article.find((err, stream)=>{
      if(err){
          res.json({'Error' : 'Error connecting to DB'});
      }
      else{
          res.json(stream);
      }
  });
});


router.get('/getArticle', function(req, res) {
  Article.findOne({artId: req.query.artId},(err, article)=>{
      if(err){
          res.json({'Error' : 'Error connecting to DB'});
      }
      else{
          res.json(article);
      }
  });
});


router.post('/vote', (req, res) => {
  query = {'artId' : req.body.artId}
  switch(req.body.updtOpt){ //updtOpt determines up/down vote
    case 1: update = {$inc: {upVotes : 1 }}; break;                   //upVote
    case 2: update = {$inc: {upVotes : -1 }}; break;                  //cancel upVote
    case 3: update = {$inc: {downVotes : 1 }}; break;                 //downVote
    case 4: update = {$inc: {downVotes : -1 }}; break;                //cancel downVote
    case 5: update = {$inc: {upVotes : 1, downVotes : -1 }}; break;   //upVote when downvoted
    case 6: update = {$inc: {upVotes : -1, downVotes : 1 }}; break;   //downVote when upvoted
  }
  Article.findOneAndUpdate(query, update, {new : true}, (err, doc) => {
    if (err) {
        console.log("Something wrong when updating data!");
    }
    res.send(doc);
  });
});


// router.post('/voteSet', (req, res) => {
//   query = {'artId' : req.body.artId}
//   update = {$set: {upVotes :  req.body.upv, downVotes : req.body.downv}};
//   Article.findOneAndUpdate(query, update, {new : true}, (err, doc) => {
//     if (err) {
//         console.log("Something wrong when updating data!");
//     }
//     res.send(doc);
//   });
// });





module.exports = router;