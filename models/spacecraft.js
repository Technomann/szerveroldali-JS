const Schema = require('mongoose').Schema;
const db = require('../config/db');

const Spacecraft = db.model('Spacecraft', {
    name: String,
    type: String,
    rating: { Number, min: 0, max: 5 },
    manufacturer: String,
    price: Number,
    passengers: Number,
    length: Number,
    width: Number,
    engine: String,
    hyperdrive: String,
    cargoCapacity: Number,
    maxVelocity: Number,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
});

module.exports = Spacecraft;