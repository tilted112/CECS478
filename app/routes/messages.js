//
const express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('../../config');

const messages_controller = require('../controller/messagesController');

router.post('/getmessage', messages_controller.getMessage);
router.get('/getmessage/:id', messages_controller.getMessageByID);
router.delete('/:id', messages_controller.deleteMessage);
router.post('/sendmessage', messages_controller.sendMessage);

//protect the routes
/*
router.use(function (req, res, next) {
    console.log('protected');
    console.log(req)
    var token = req.body.token;

    if (token) {
        jwt.verify(token, config.secret, function (err, decoded) {
            if (err) {
                return res.json({success: false, message: 'Failed to authenticate token'});
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
*/
module.exports = router;
