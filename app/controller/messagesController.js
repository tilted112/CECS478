//
const Message = require('../models/message');
const jwt = require('jsonwebtoken');
const config = require('../../config');

exports.getMessage = function (req, res) {
    const jwtoken = req.body.token;
    const from = req.body.from;
    jwt.verify(jwtoken, config.secret, function (err, token) {
       if(err){
           res.status(403).json({success: false, message: 'JWT not valid'});
       }else{
            Message.findOne({to: token.name, from: from}, function (err2, message) {
                if(err2){
                    res.status(204).json({success: true, message: 'No message'});
                }else{
                    if(message){
                        res.status(200).json(message);
                        //delete message in db
                    }else{
                        res.status(204).json({success: true, message: 'There are no messages for you'});
                    }
                }
           });
       }
    });
};

exports.getMessageByID = function (req, res) {
	Message.findById(req.params.id, function(err, message){
		if(err)
			res.send(err);
		res.json(message);
	});
};

exports.sendMessage = function (req, res) {
    var jwtoken = req.body.token;
    var to = req.body.to;
    var message = req.body.message;
    jwt.verify(jwtoken, config.secret, function (err, token) {
        if(err){
            res.status(403).json({success: false, message: 'JWT not valid'});
        }else{
            const newMessage = new Message({from: token.name, to: to, message: message});
            newMessage.save(function (err2, message) {
               if(err2){
                   res.send(err);
               }
               res.status(200).json(message);
            });
        }
    });

};

exports.deleteMessage = function (req, res) {
	Message.findByIdAndRemove({_id: req.params.id}, function(err, message){
		if(err)
			res.send(err);
		res.status(200).json({success: true, message: 'Message deleted'});
	});
};