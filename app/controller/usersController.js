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
        if (err) {
            res.status(500).send(err);
            return "break";
        }
        res.status(200).json(newUser);
    });
};

//Delete User - DELETE - /users/:id
exports.delete_user = function (req, res) {
    User.findByIdAndRemove({_id: req.params.id}).then(function (user) {
        res.status(200).send(user);
    });

};

//Signin User - POST - /users/signin
exports.signin_user = function (req, res) {
    User.findOne({
        name: req.body.name
    }, function (err, user) {
        if (err){
            res.status(500).send(err)
        }
        if (!user) {
            res.status(403).json({token: "error"});
        } else {
            user.comparePassword(req.body.password, function (err, isMatch) {
                if (err)
                    res.status(500).send(err);
                //If password is valid, send token
                if (isMatch) {
                    token = jwt.sign({name: req.body.name, id: user._id}, config.secret, {
                        expiresIn: '24h'
                    });
                    res.status(200).json({token: token, id: user._id});
                } else {
                    res.status(403).json({token: "error"});
                }
            });

        }
    });
};
