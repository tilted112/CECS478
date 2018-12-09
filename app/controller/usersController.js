//
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('../../config');


//Create User - POST - /users/signup
exports.signup_user = function (req, res, next) {
    const newUser = new User({
        name: req.body.name,
        password: req.body.password
    });
    newUser.save(function (err) {
        if (err) throw err;
        res.status(200).json(newUser);
    });
};

//Alter User - PUT - /users/:id
exports.update_user = function (req, res) {
    //does not work as expected - password not hashed!
    User.findByIdAndUpdate({_id: req.params.id}, req.body).then(function () {
        User.findOne({_id: req.params.id}).then(function (user) {
            res.status(200).send(user);
        })
    });

};

//Delete User - DELETE - /users/:id
exports.delete_user = function (req, res) {

    User.findByIdAndRemove({_id: req.params.id}).then(function (user) {
        res.status(200).send({
            success: "true",
            message: "User successfully delete from database"
        });
    });

};

//Signin User - POST - /users/signin
exports.signin_user = function (req, res) {
    User.findOne({
        name: req.body.name
    }, function (err, user) {
        if (err) throw err;
        if (!user) {
            res.status(403).json({token: "error"});
        } else {
            user.comparePassword(req.body.password, function (err, isMatch) {
                if (err)
                    res.status(500).send(err);
                //If password is valid, send token
                if (isMatch) {
                    token = jwt.sign({name: req.body.name, id: user._id}, config.secret, {
                        expiresIn: 86400
                    });
                    res.status(200).json({token: token});
                } else {
                    res.status(403).json({token: "error"});
                }
            });

        }
    });
};

//Return all users in database - GET - /users/list
exports.get_all_user = function (req, res) {
    User.find({}, function (err, user) {
        if (err)
            res.status(500).send(err);
        res.status(200).json(user);
    });
};

//Returns one users by id - GET - /users/:id
exports.get_user_by_id = function (req, res) {
    User.findById(req.params.userId, function (err, user) {
        if (err)
            res.status(500).send(err);
        res.status(200).json(user);
    });
};