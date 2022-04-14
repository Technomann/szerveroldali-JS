
/**
 * Gets a user from DB by email
 */
 const requireOption = require('../utility/requireOption');

 module.exports = function(objectRepository){
    const UserModel = requireOption(objectRepository, 'UserModel');

     return function(req, res, next){
        if((typeof req.body === 'undefined') ||
        (typeof req.body.email === 'undefined')){
            res.error.code = '431';
            res.error.message = 'Please provide correct credentials.';
            return res.redirect('/error');
        }

        UserModel.findOne({
            email: req.body.email
        }, (err, user) => {
            if(err){
                res.error.code = '432';
                res.error.message = 'Cannot get user from DB.';
                return res.redirect('/error');
            }

            if(user !== null){
                res.locals.user = user;
            }
        });
     };
 };