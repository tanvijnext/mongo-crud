const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userData = new Schema({
    name: { type: String },
    email: { type: String },
    password: { type: String },
    token: { type: String }
}, { versionKey: false })
module.exports = mongoose.model('User', userData)