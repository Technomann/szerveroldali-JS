
/**
 * Gets the two users for comparison then calls next
 */
 const requireOption = require('../utility/requireOption');

 module.exports = function(objectRepository){
     return function(req, res, next){
         next(); //VALSZEG NEM LESZ ERRE SZÜKSÉG
     };
 };