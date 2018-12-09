const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: [true, 'Name field is required']
    },
    password: {
        type: String,
        required: [true, 'Password field is required']
    }
});

//Creating the passwordHash
UserSchema.pre('save', async function (next) {
    try {
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(this.password, salt);
        this.password = passwordHash;
        next();
    } catch (error) {
        next(error);
    }
});

//Check whether the entered password is valid
UserSchema.methods.comparePassword = function(newPassword, callback){
  bcrypt.compare(newPassword, this.password, function (err, isMatch) {
     if(err)
         callback(null, false);
     callback(null, isMatch);
  });
};

module.exports = mongoose.model('User', UserSchema);
