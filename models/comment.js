const Schema = require('mongoose').Schema;
const db = require('../config/db');

const Comment = db.model('Comment', {
    title: String,
    text: String,
    date: Date,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    spacecraft: {
        type: Schema.Types.ObjectId,
        ref: 'Spacecraft'
    }
});

module.exports = Comment;
