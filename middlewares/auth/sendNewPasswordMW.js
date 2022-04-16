
/**
 * Creates new password for user given in locals, writes the pass into db, writes the pass to console
 * and redirects to /
 */
 const requireOption = require('../utility/requireOption');
 const randomString = require('randomstring');

 module.exports = function(objectRepository){
    return function(req, res, next){
        if(typeof req.body === 'undefined'){
            res.locals.error.code = '2342';
            res.locals.error.message = 'Some error happened!';
            return res.redirect('/error');
        }

        if(typeof req.body.email === 'undefined'){
            return next();
        }

        if(typeof res.locals.user === 'undefined'){
            res.locals.error.message = 'No such email registered.';
            return next();
        }

        const newPassword = randomString.generate({
            length: 10,
            charset: 'alphabetic'
        });

        res.locals.user.password = newPassword;
        res.locals.user.save((err) => {
            if(err){
                res.locals.error.code = '433';
                res.locals.error.message = 'Cannot update user.';
                return res.redirect('/error');
            }
            console.log(newPassword);
            return res.redirect('/');
        })
    };
 };