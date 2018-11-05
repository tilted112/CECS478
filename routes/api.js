const express = require('express');
const router = express.Router();
const User = require('../app/models/user');

//GET
router.get('/users', function (req,res, next) {
   res.send({type:'GET'});
});

//POST
router.post('/users', function (req,res, next) {
    User.create(req.body).then(function (user) {
        res.send(user);
    }).catch(next);
});

//PUT
router.put('/users/:id', function (req,res, next) {
    res.send({type:'PUT'});
});

//DELETE
router.delete('/users/:id', function (req,res, next) {
    res.send({type:'DELETE'});
});

module.exports = router;