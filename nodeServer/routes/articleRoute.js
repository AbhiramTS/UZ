const express = require('express');
const router = express.Router();
const Article = require('../models/article');


router.post('/submit', function(req, res) {
  if (!req.body.name|| !req.body.password) { //CHANGE PARAMETERS HERE
    res.json({success: false, msg: 'Please pass all required fields.'});
  } else {
    var newArticle = new Article({
      articleId : "",             //AND HERE
      link : req.body.link,
      title: req.body.title,
      author: req.body.author,
      img: req.body.img,
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
  Article.find((err, bills)=>{
      if(err){
          res.json({'Error' : 'Error connecting to DB'});
      }
      else{
          res.json(bills);
      }
  });
});



module.exports = router;