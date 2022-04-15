const Schema = require('mongoose').Schema;
const db = require('../config/db');

const Spacecraft = db.model('Spacecraft', {
    name: String,
    type: String,
    rating: { type: Number, min: 0, max: 5 },
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
    imageName: String
});

module.exports = Spacecraft;
