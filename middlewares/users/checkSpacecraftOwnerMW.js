
/**
 * Checks if currently logged in user is author of currently detail viewed spacecraft, and if yes, puts this 
 * info into locals, otherwise calls next
 */
 const reuireOption = require('../utility/requireOption');

 module.exports = function(objectRepository){
     return function(req, res, next){
         next();
     };
 };