//
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('../../config');

const messages_controller = require('../controller/messagesController');

router.post('/getmessage', jwtCheck, messages_controller.getMessage);
router.get('/getmessage/:id', jwtCheck, messages_controller.getMessageByID);
router.delete('/:id', jwtCheck, messages_controller.deleteMessage);
router.post('/sendmessage', jwtCheck, messages_controller.sendMessage);

function jwtCheck(req, res, next) {
    console.log('protected');
    const token = req.body.token;
    if (token) {
        jwt.verify(token, config.secret, function (err, decoded) {
            if (err) {
                console.log('failed to authenticate token');
                return res.status(403).json({success: false, message: 'Failed to authenticate token'});
            } else {
                console.log('next');
                return next();
            }
        });
    } else {
        console.log('No token');
        return res.status(403).send({success: false, message: 'No token provided'});
    }
}

/*
router.use(function (req,res,next) {
    console.log('protected');
    const token = req.body.token;
    if (token) {
        jwt.verify(token, config.secret, function (err, decoded) {
            if (err) {
                console.log('failed to authenticate token');
                return res.status(403).json({success: false, message: 'Failed to authenticate token'});
            } else {
                console.log('next');
                req.decoded = decoded;
                next();
            }
        });
    } else {
        console.log('No token');
        return res.status(403).send({success: false, message: 'No token provided'});
    }
});
*/
module.exports = router;
