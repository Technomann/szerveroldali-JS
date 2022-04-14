
/**
 * Creates new password for user given in locals, writes the pass into db, writes the pass to console
 * and redirects to /
 */
 const requireOption = require('../utility/requireOption');
 const randomString = require('randomstring');

 module.exports = function(objectRepository){
    

    return function(req, res, next){
        if(typeof res.locals.user === 'undefined'){
            res.error.message = 'No such email registered.';
            return next();
        }

        const temporaryPassword = randomString.generate({
            length: 10,
            charset: 'alphabetic'
        });

        user.password = temporaryPassword;
        user.save((err) => {
            if(err){
                res.error.code = '433';
                res.error.message = 'Cannot update user.';
                return res.redirect('/error');
            }

            console.log(temporaryPassword);

            return res.redirect('/login');
        })
       
    };
 };