const mongoose = require('mongoose');
const config = require('./index.js');



module.exports = (app) => {
    mongoose.connect(config.DB_CONNECTION);

    const db = mongoose.connection;

    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', console.log.bind(console, 'Database connected!'));
}