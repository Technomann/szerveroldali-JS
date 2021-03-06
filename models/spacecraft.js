const Schema = require('mongoose').Schema;
const db = require('../config/db');

const Spacecraft = db.model('Spacecraft', {
    name: String,
    type: String,
    ratingSum: Number,
    ratingAmount: Number,
    manufacturer: String,
    price: Number,
    passengers: Number,
    length: Number,
    width: Number,
    engine: String,
    hyperdrive: String,
    cargoCapacity: Number,
    maxSpeed: Number,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    authorName: String,
    imageName: String
});

module.exports = Spacecraft;
