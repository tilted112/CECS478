//routes for user signup, authentication
var express = require('express');
var router = express.Router();

//import apiController with route actions
const users_controller = require('../controller/usersController');

//define all routes here
//Create User - POST
router.post('/signup', users_controller.signup_user);
//Alter User - PUT
router.put('/:id', users_controller.update_user);
//Delete User - DELETE
router.delete('/:id', users_controller.delete_user);
//Authenticate User - POST
router.post('/signin', users_controller.signin_user);

//export the router
module.exports = router;
