const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const morgan = require('morgan');

const routes = require('./routes/api');

var jwt = require('jsonwebtoken');
var config = require('./config');
var User = require('./app/models/user');

var port = process.env.PORT || 4000;

mongoose.connect(config.database);
mongoose.Promise = global.Promise;


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use('/api', routes);
app.use(morgan('dev'));


app.listen(port, function () {
    console.log('now listening for requests on port: ' + port);
});