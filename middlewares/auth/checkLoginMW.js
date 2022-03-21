
/**
 * Check user login info (POST), if correct: redirects to /spacecrafts/list, 
 * if not,  sets error on res.locals.error based on error type, give the entered credentials to res and calls next
 */
 const reuireOption = require('../utility/requireOption');

 module.exports = function(objectRepository){
     return function(req, res, next){
         next();
     };
 };