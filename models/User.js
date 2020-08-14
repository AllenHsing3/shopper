const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    admin: {
        type:Boolean,
        default: false
    }
})

module.exports = User = mongoose.model('user', UserSchema)