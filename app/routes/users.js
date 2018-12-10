//Routes Definition for /users
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('../../config');

//import apiController with route actions
const users_controller = require('../controller/usersController');

//define all routes here
//Create User - POST
router.post('/signup', users_controller.signup_user);
//Authenticate User and receive JWT token - POST
router.post('/signin', users_controller.signin_user);

//Protected Routes - token must be provided with the json object
//Delete User - DELETE
router.delete('/:id',jwtCheck, users_controller.delete_user);

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

//export the router
module.exports = router;
