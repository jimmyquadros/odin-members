const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const memberSchema = new Schema({
    username: { type: String },
    password: { type: String },
    verified: { type: Boolean },
    admin: { type: Boolean }
});

module.exports = mongoose.model('Member', memberSchema);