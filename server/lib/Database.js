require('dotenv').config();
const mongoose = require('mongoose');

exports.init = function () {
    return new Promise((resolve, reject) => {
        mongoose.Promise = global.Promise;
        const conn = mongoose.connection;
        mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
        conn.on('error', (err) => reject(err));
        conn.once('open', () => resolve());
    })
}