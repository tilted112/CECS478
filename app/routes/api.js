/*
'use strict';

const express = require('express');
const router = express.Router();
const User = require('../models/user');
const app = express();

var jwt = require('jsonwebtoken');
var config = require('../../config');

app.set('superSecret', config.secret);

//GET
router.get('/', function(req, res) {
   res.json({message: 'users api'});
});

router.get('/users', function (req,res, next) {
    User.find({}).then(function (users) {
        res.json(users);
    });
});

//POST
router.post('/users', function (req,res, next) {
    User.create(req.body).then(function (user) {
        res.send(user);
    }).catch(next);
});

router.post('/authenticate', function(req, res) {
   User.findOne({
      name: req.body.name
   }, function(err, user) {
       if(err) throw err;
       if(!user){
           res.json({success: false, message: 'Authentication failed. User not found.'});
       }else if (user){
           if(user.password != req.body.password){
               res.json({success:false, message:'Authentication failed. Wrong password.'});
           } else {
               console.log('auth successful');
               const payload = {
                   admin: user.admin
               };
               var token = jwt.sign(payload, app.get('superSecret'), {
                  expiresIn : 1440
               });

               res.json({
                   success: true,
                   message: 'You are now authenticated',
                   token: token
               });
           }
       }
   });
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

//Setup
router.get('/setup', function(req, res) {
   var till = new User({
       name: 'Till',
       password: 'test',
       admin: true
   });
   till.save(function(err) {
       if (err) throw err;
       console.log('User saved successfully');
       res.json({success: true});
   })
});

router.use(function(req,res,next) {
    var token = req.body.token || req.query.token || req.header['x-access-token'];
    if(token){
        jwt.verify(token, app.get('superSecret'), function (err, decoded) {
            if(err) {
                return res.json({
                    sucess: false,
                    message: 'Failed to authenticate token.'
                });
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        return res.status(403).send({
            success: false,
            message: 'No token provided'
        });
    }
});

module.exports = router;
///////////////////////

///////////////////////
const express = require('express');
const router = express.Router();

module.exports = function(app){
    const user = require('../controller/apiController');

    router.get('/users', user.list_all_user());
    router.post('/users', user.create_new_user());
    router.get('/users/:id', user.read_user());
    router.put('/users/:id', user.update_user());
    router.delete('/users/:id', user.delete_user());
    router.post('/users/authenticate', user.authenticate_user());

};*/