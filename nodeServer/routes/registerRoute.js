const express = require('express');
const router = express.Router();

const User = require('../models/user');

router.post('/', (req, res)=>{
    let newUser = new User(req.body);
    newUser.save().then(b=>{
        res.status(200).json({"Register": "Successfully registered"});            
    }).catch(err=>{res.status(400).send("Failed to register user")});
});

module.exports = router;