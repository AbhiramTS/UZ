const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyparser = require('body-parser');
const path = require('path');

const dbconnect = require('./dbconnect');



mongoose.Promise = global.Promise;
mongoose.connect(dbconnect.db, {useNewUrlParser :true}).then(()=>{
    console.log('Database is connected') },
    err => { console.log('Cannot connect to DB'+err)}
);

const app = express();
app.use(cors());
app.use(bodyparser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });


app.listen(process.env.PORT || 4000, ()=>{
    console.log('Backend running at http://127.0.0.1:3000');
});