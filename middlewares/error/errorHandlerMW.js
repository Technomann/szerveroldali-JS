
/**
 * Handles server side errors
 */
 const reuireOption = require('../utility/requireOption');

 module.exports = function(objectRepository){
     return function(err, req, res, next){
        res.status(500).send('Durasteel is out of stock! Come back later.');

        console.log(err.stack)
     };
 };