
/**
 * Handles errors and calls next
 */
 const reuireOption = require('../utility/requireOption');

 module.exports = function(objectRepository){
     return function(err, req, res, next){
        
        next();
     };
 };