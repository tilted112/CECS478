//routes for user signup, authentication
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

function jwtCheck(req, res, next) {
    const token = req.headers['x-access-token'] || req.body.token;
    if (token) {
        jwt.verify(token, config.secret, function (err, decoded) {
            if (err) {
                return res.status(403).json({success: false, message: 'Failed to authenticate token'});
            } else {
                return next();
            }
        });
    } else {
        return res.status(403).send({success: false, message: 'No token provided'});
    }
}

//export the router
module.exports = router;
