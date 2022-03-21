
/**
 * Deletes spacecraft from db by id and redirects to /spacecrafts/list
 */
 const reuireOption = require('../utility/requireOption');

 module.exports = function(objectRepository){
     return function(req, res, next){
         next();
     };
 };