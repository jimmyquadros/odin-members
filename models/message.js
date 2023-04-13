const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    content: { type: String },
    member: { type: Schema.Types.ObjectId, ref: 'Member', required: true },
    date_posted: { type: Date },
    date_updated: { type: Date },
});

module.exports = mongoose.model('Message', messageSchema);