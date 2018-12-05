const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    from: {
        type: String,
        required: [true, 'From field is required']
    },
    to: {
        type: String,
        required: [true, 'To field is required']
    },
    message: {
        type: String,
        required: [true, 'Message field is required']
    }
});

module.exports = mongoose.model('message', MessageSchema);