//Controller for all /users requests
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('../../config');


//Create User - POST - /users/signup
exports.signup_user = function (req, res, next) {
    //create new user
    const newUser = new User({
        name: req.body.name,
        password: req.body.password
    });
    //save new user to DB
    newUser.save(function (err) {
        if (err) {
            res.status(500).send(err);
            return "break";
        }
        //send confirmation
        res.status(200).json(newUser);
    });
};

//Delete User - DELETE - /users/:id
exports.delete_user = function (req, res) {
    //find user by ID and remove him from DB
    User.findByIdAndRemove({_id: req.params.id}).then(function (user) {
        res.status(200).send(user);
    });

};

//Signin User - POST - /users/signin
exports.signin_user = function (req, res) {
    //find user in DB
    User.findOne({
        name: req.body.name
    }, function (err, user) {
        if (err){
            res.status(500).send(err)
        }
        if (!user) {
            //if no user found send error
            res.status(403).json({token: "error"});
        } else {
            //compare provided password with password from DB
            user.comparePassword(req.body.password, function (err, isMatch) {
                if (err)
                    res.status(500).send(err);
                //If password is valid, send token
                if (isMatch) {
                    //generate JWT and send back, signed with username and id
                    token = jwt.sign({name: req.body.name, id: user._id}, config.secret, {
                        expiresIn: '24h'
                    });
                    res.status(200).json({token: token, id: user._id});
                } else {
                    //invalid password - send error
                    res.status(403).json({token: "error"});
                }
            });

        }
    });
};
