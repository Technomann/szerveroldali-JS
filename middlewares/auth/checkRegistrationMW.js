
/**
 * Checks registration data (POST), if correct puts entered data into res and calls next, 
 * if not, put error into res and calls next
 */
 const reuireOption = require('../utility/requireOption');

 module.exports = function(objectRepository){
     return function(req, res, next){
         next();
     };
 };