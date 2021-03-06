const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config');
const usersRouter = require('./app/routes/users');
const messagesRouter = require('./app/routes/messages');
const helmet = require('helmet');
const morgan = require('morgan');

//
app.use(morgan('dev'));
app.use(helmet());
app.use(express.static("./public"));
//
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
//Routers for users/messages routes
app.use('/users', usersRouter);
app.use('/messages', messagesRouter);
//

//connect to mongoDB
mongoose.connect(config.database);
mongoose.Promise = global.Promise;
app.set('superSecret', config.secret);

//Start RESTful API and listen on Port
app.listen(port, function () {
    console.log('RESTful API listing on port: ' + port);
});

module.exports = app;