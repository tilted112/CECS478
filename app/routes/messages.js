//
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('../../config');

const messages_controller = require('../controller/messagesController');

router.post('/getmessage', jwtCheck, messages_controller.getMessage);
router.post('/sendmessage', jwtCheck, messages_controller.sendMessage);

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

module.exports = router;