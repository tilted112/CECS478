//
const Message = require('../models/message');

exports.getMessage = function (req, res) {
    const token = req.headers['x-access-token'] || req.body.token;
    Message.findOne({to: token.name, from: req.body.from}, function (err, message) {
        if (err) {
            res.status(204).json({success: true, message: 'No message'});
        } else {
            if (message) {
                res.status(200).json(message);
                Message.findByIdAndRemove({_id: message.id}, function (err, msg) {
                    if (err)
                        res.send(err)
                });
            } else {
                res.status(204).json({success: true, message: 'There are no messages for you'});
            }
        }
    });
};

exports.getMessageByID = function (req, res) {
    Message.findById(req.params.id, function (err, message) {
        if (err)
            res.send(err);
        res.json(message);
    });
};

exports.sendMessage = function (req, res) {
    const token = req.headers['x-access-token'] || req.body.token;
    const newMessage = new Message({from: token.name, to: req.body.to, message: req.body.message});
    newMessage.save(function (err, msg) {
        if (err) {
            res.send(err)
        }
        res.status(200).json(msg);
    });
};

exports.deleteMessage = function (req, res) {
    Message.findByIdAndRemove({_id: req.params.id}, function (err, message) {
        if (err)
            res.send(err);
        res.status(200).json({success: true, message: 'Message deleted'});
    });
};