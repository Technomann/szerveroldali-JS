
/**
 * Creates new password for user given in locals, writes the pass into db, writes the pass to console
 * and redirects to /
 */
 const requireOption = require('../utility/requireOption');

 module.exports = function(objectRepository){
     return function(req, res, next){
         next();
     };
 };