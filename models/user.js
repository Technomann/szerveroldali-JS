const Schema = require('mongoose').Schema;
const db = require('../config/db');

const User = db.model('User', {
    username: String,
    email: String,
    password: String,
    imageName: String
});

module.exports = User;
