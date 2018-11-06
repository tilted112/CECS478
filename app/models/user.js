const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const UserSchema = new Schema({
    name:{
        type:String,
        required:[true,'Name field is required']
    },
    password:{
        type:String,
        required:[true, 'Password field is required']
    },
    admin:{
        type: Boolean,
        default: false
    }
});

const User = mongoose.model('user', UserSchema);

module.exports = User;