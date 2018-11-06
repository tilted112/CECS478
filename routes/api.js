const express = require('express');
const router = express.Router();
const User = require('../app/models/user');

//GET
router.get('/users', function (req,res, next) {
    User.find({}).then(function (users) {
        res.send(users);
    });
});

//POST
router.post('/users', function (req,res, next) {
    User.create(req.body).then(function (user) {
        res.send(user);
    }).catch(next);
});

//PUT
router.put('/users/:id', function (req,res, next) {
    User.findByIdAndUpdate({_id: req.params.id},req.body).then(function(){
        User.findOne({_id: req.params.id}).then(function(user){
            res.send(user);
        })
    });
});

//DELETE
router.delete('/users/:id', function (req,res, next) {
    User.findByIdAndRemove({_id: req.params.id}).then(function(user){
        res.send(user);
    });
});

module.exports = router;