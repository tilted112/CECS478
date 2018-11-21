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

//Check if password is valid
//does give correct value T/F to res; however does not work
UserSchema.methods.isPasswordValid = async function (newPassword) {
    console.log(newPassword);
    console.log(this.password);
    bcrypt.compare(newPassword, this.password, function (err, res) {
        return res;
    });
};

module.exports = mongoose.model('User', UserSchema);
