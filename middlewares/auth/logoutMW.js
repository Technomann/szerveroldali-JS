
/**
 * Logs the user out (delete session data??) and redirects to /
 */
 const reuireOption = require('../utility/requireOption');

 module.exports = function(objectRepository){
     return function(req, res, next){
         next();
     };
 };