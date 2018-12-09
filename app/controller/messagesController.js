//
const Message = require('../models/message');

exports.getMessage = function (req, res) {
    Message.findOne({to: req.body.to, from: req.body.from}, function (err, message) {
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
    const newMessage = new Message({from: req.body.from, to: req.body.to, message: req.body.message});
    console.log(newMessage);
    newMessage.save(function (err, msg) {
        if (err) {
            res.status(500).send(err)
        }
        res.status(200).json(msg);
    });
};