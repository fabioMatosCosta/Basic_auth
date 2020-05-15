require('dotenv').config();
var cors = require('cors')
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session    = require("express-session");
const MongoStore = require("connect-mongo")(session);
const mongoose     = require('mongoose');

const mongoUser = process.env.MONGOUSER;
const mongoPass = process.env.MONGOPASS;

mongoose
    .connect(`mongodb+srv://${mongoUser}:${mongoPass}@cluster0-qogyt.azure.mongodb.net/test?retryWrites=true&w=majority`, {useNewUrlParser: true,useUnifiedTopology: true})
    .then(x => {
        console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
    })
    .catch(err => {
        console.error('Error connecting to mongo:', err)
    });

mongoose.set('useFindAndModify', false);

var app = express();

const secretSess = process.env.SECRETSESS

app.use(session({
    secret: secretSess,
    cookie: { maxAge: 1200000 },
    store: new MongoStore({
        mongooseConnection: mongoose.connection,
        ttl: 24 * 60 * 60 
    })
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var indexRouter = require('./routes/index');
var userSignup = require('./routes/user/signup');
var userLogin = require('./routes/user/login');

app.use('/', indexRouter);
app.use('/users', userSignup);
app.use('/users', userLogin);

module.exports = app;