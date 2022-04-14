
/**
 * If POST: saves new spacecraft into db, if something is wrong, puts error into locals and calls next
 * If GET: calls next
 */
 const requireOption = require('../utility/requireOption');

 module.exports = function(objectRepository){
    return function(req, res, next){
        next();
    };
 };