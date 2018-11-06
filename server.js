const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const morgan = require('morgan');

const routes = require('./routes/api');

var jwt = require('jsonwebtoken');
var config = require('./config');
var User = require('./app/models/user');

var port = process.enc.PORT || 4000;

mongoose.connect(config.database);
mongoose.Promise = global.Promise;
app.set('superSecret', config.secret);

app.use(bodyParser.urlencoded)

app.use(bodyParser.json());
app.use('/api', routes);
app.use(function(err, req, res, next) {
   res.status(422).send({error: err.message});
});

app.listen(4000, function () {
    console.log('now listening for requests');
});