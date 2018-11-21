const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 4000;
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config');
const usersRouter = require('./app/routes/users');
const helmet = require('helmet');
const morgan = require('morgan');
const router = express.Router();

//
app.use(morgan('dev'));
app.use(helmet());
app.use(express.static("./public"));
//
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
//
app.use('/users', usersRouter);
//


//connect to mongoDB
mongoose.connect(config.database);
mongoose.Promise = global.Promise;
app.set('superSecret', config.secret);

//listen on Port
app.listen(port, function () {
    console.log('RESTful API listing on port: ' + port);
});

module.exports = app;