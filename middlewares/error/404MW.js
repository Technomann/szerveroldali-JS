
/**
 * HANDLES 404 ERRORS AND PUTS BAD URL INTO LOCALS AND CALLS NEXT
 */

module.exports = function(objectRepository){
    return function(req, res, next){
        res.locals.badUrl = req.originalUrl;
        return next();
    };
};