
/**
 * If there is user data in res.locals then saved it to db and calls next,
 * otherwise calls next
 */
 const requireOption = require('../utility/requireOption');

 module.exports = function(objectRepository){
     return function(req, res, next){
         next();
     };
 };