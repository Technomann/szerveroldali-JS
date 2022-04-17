
/**
 * HANDLES UNEXPECTED ERRORS
 */

 module.exports = function(objectRepository){
    return function(err, req, res, next){
        res.locals.error.message = err;
        res.locals.error.code = '999';
        return res.redirect('/error');
    };
};
