//
const Message = require('../models/message');

exports.getMessage = function (req, res) {
    Message.findOne({to: "till", from: req.body.from}, function (err, message) {
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
    const newMessage = new Message({from: "till", to: req.body.to, message: req.body.message});
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