
/**
 * If there is user data in res.locals then saved it to db and calls next,
 * otherwise calls next
 */
 const requireOption = require('../utility/requireOption');

 module.exports = function(objectRepository){
    return function(req, res, next){
        if(typeof res.locals.user === 'undefined'){
            res.locals.error.message = 'Something wrong!';
            res.locals.error.code = '4665'
            return res.redirect('/error');
        }

        if(typeof res.locals.error.message !== 'undefined'){
            return next();
        }

        res.locals.user.save((err) => {
            if(err){
                res.locals.error.code = '738';
                res.locals.error.message = 'Cannot save user!';
                return res.redirect('/error');
            }
            return res.redirect('/login')
        });

        //TALÁN EZ A MW SEM KELL
    };
 };