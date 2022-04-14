
/**
 * If there is user data in res.locals then saved it to db and calls next,
 * otherwise calls next
 */
 const requireOption = require('../utility/requireOption');

 module.exports = function(objectRepository){
    return function(req, res, next){
        if(typeof res.locals.user === 'undefined'){
            return next();
        }

        res.locals.user.save((err) => {
            if(err){
                res.error.code = '738';
                res.erro.message = 'Cannot save user!';
                return res.redirect('/error');
            }
        });
    };
 };