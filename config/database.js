require('dotenv').config();
const mongoose = require('mongoose');

const mongoDb_URI = process.env.MONGODB_URI;
mongoose.connect(mongoDb_URI, { useUnifiedTopology: true, useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection Error...'));

module.exports = db.getClient();