//Routes Definition for /messages
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('../../config');

//import apiController with route actions
const messages_controller = require('../controller/messagesController');

//define all routes here
//Get Message - POST - protected
router.post('/getmessage', jwtCheck, messages_controller.getMessage);
//Send Message - POST - protected
router.post('/sendmessage', jwtCheck, messages_controller.sendMessage);

//Function to check if a provided JWT is valid
function jwtCheck(req, res, next) {
    //receive token from header or body
    const token = req.headers['x-access-token'] || req.body.token;
    if (token) {
        //Check if token is valid
        jwt.verify(token, config.secret, function (err, decoded) {
            if (err) {
                //invalid token, send error
                return res.status(403).json({success: false, message: 'Failed to authenticate token'});
            } else {
                //token is valid, go on with controller action
                return next();
            }
        });
    } else {
        //no token provided
        return res.status(403).send({success: false, message: 'No token provided'});
    }
}

module.exports = router;