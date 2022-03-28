const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/vvued2', {userNewUrlParser: true});

module.exports = mongoose;
