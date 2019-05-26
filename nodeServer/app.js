const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyparser = require('body-parser');
const path = require('path');
const passport = require('passport');

const keys = require('./config/keys');
const passportSetup = require('./config/passport_setup');

const authRoute = require('./routes/authRoute');



mongoose.Promise = global.Promise;
mongoose.connect(keys.db, {useNewUrlParser :true}).then(()=>{
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

app.use(passport.initialize());
app.use(passport.session());


app.use('/auth', authRoute);

app.listen(process.env.PORT || 4000, ()=>{
    console.log('Backend running at http://127.0.0.1:4000');
});