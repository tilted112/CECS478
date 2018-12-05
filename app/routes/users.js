//routes for user signup, authentication
const express = require('express');
var router = express.Router();

//import apiController with route actions
const users_controller = require('../controller/usersController');

//define all routes here
//Create User - POST
router.post('/signup', users_controller.signup_user);
//Authenticate User and receive JWT token - POST
router.post('/signin', users_controller.signin_user);

//Protected Routes - token must be provided with the json object
//Alter User - PUT
router.put('/:id', users_controller.update_user);
//Delete User - DELETE
router.delete('/:id', users_controller.delete_user);
//Get specific User - GET
router.get('/:id', users_controller.get_user_by_id);

//
//List all User - GET
router.get('/list', users_controller.get_all_user);


//export the router
module.exports = router;
