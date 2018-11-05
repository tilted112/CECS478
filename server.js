const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const routes = require('./routes/api');

mongoose.connect('mongodb://localhost/userdb');
mongoose.Promise = global.Promise;

app.use(bodyParser.json());
app.use('/api', routes);
app.use(function(err, req, res, next) {
   res.status(422).send({error: err.message});
});

app.listen(4000, function () {
    console.log('now listening for requests');
});