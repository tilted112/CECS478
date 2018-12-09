//
const Message = require('../models/message');

exports.getMessage = function (req, res) {
    const token = req.headers['x-access-token'] || req.body.token;
    Message.findOne({to: token.name, from: req.body.from}, function (err, message) {
        if (err) {
            res.status(500).json({success: true, message: 'No message'});
        } else {
            if (message) {
                Message.findByIdAndRemove({_id: message.id}, function (err, msg) {
                    if (err)
                        res.status(500).send(err)
                });
                res.status(200).json(message);
            } else {
                res.status(204).json({success: true, message: 'There are no messages for you'});
            }
        }
    });
};

exports.sendMessage = function (req, res) {
    const token = req.headers['x-access-token'] || req.body.token;
    const newMessage = new Message({from: token.name, to: req.body.to, message: req.body.message});
    newMessage.save(function (err, msg) {
        if (err) {
            res.status(500).send(err)
        }
        res.status(200).json(msg);
    });
};