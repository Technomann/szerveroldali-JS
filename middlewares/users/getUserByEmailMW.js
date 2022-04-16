
/**
 * Gets a user from DB by email
 */
 const requireOption = require('../utility/requireOption');

 module.exports = function(objectRepository){
    const UserModel = requireOption(objectRepository, 'UserModel');

     return function(req, res, next){
        if(typeof req.body === 'undefined'){
            res.locals.error.code = '431';
            res.locals.error.message = 'Please provide correct credentials.';
            return res.redirect('/error');
        }

        if(typeof req.body.email === 'undefined' && typeof req.session.loggedInUser === 'undefined'){
            return next();
        }

        UserModel.findOne({
            email: typeof req.session.loggedInUser === 'undefined' ? req.body.email : req.session.loggedInUser.email
        }, (err, user) => {
            if(err){
                res.locals.error.code = '432';
                res.locals.error.message = 'Cannot get user from DB.';
                return res.redirect('/error');
            }

            if(user !== null){
                res.locals.user = user;
            }
            return next();
        });
     };
 };