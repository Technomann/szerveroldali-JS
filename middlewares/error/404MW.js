
/**
 * Puts wrong url into locals and and redirects to /404
 */
 const reuireOption = require('../utility/requireOption');

 module.exports = function(objectRepository){
     return function(req, res, next){
        res.locals.badUrl = req.originalUrl;
        return next();
     };
 };