//Controller for all /messages requests
const Message = require('../models/message');

//getMessage - POST - /messages/getmessage
exports.getMessage = function (req, res) {
    //find messages in DB
    Message.findOne({to: req.body.to, from: req.body.from}, function (err, message) {
        if (err) {
            res.status(500).json({success: true, message: 'No message'});
        } else {
            //If message found
            if (message) {
                //Remove the message from DB
                Message.findByIdAndRemove({_id: message.id}, function (err, msg) {
                    if (err)
                        res.status(500).send(err)
                });
                //Send message
                res.status(200).json(message);
            } else {
                //No messages for user in DB
                res.status(204).json({success: true, message: 'There are no messages for you'});
            }
        }
    });
};

//sendMessage - POST - /messages/sendmessage
exports.sendMessage = function (req, res) {
    //create new message
    const newMessage = new Message({from: req.body.from, to: req.body.to, message: req.body.message});
    //save new message in DB
    newMessage.save(function (err, msg) {
        if (err) {
            res.status(500).send(err)
        }
        //send confirmation
        res.status(200).json(msg);
    });
};