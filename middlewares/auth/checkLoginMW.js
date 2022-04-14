
/**
 * Check user login info (POST), if correct: redirects to /spacecrafts/list, 
 * if not,  sets error on res.locals.error based on error type, give the entered credentials to res and calls next
 */
 const requireOption = require('../utility/requireOption');

 module.exports = function(objectRepository){
    const UserModel = requireOption(objectRepository, 'UserModel');

    return function(req, res, next){
        if((typeof req.body === 'undefined') || (typeof req.body.username === 'undefined') || (typeof req.body.password === 'undefined')){
            res.error.code = '700';
            res.error.message = 'Not properly filled credentials.';
            res.redirect('/error');
        }

        UserModel.findOne({
            username: req.body.username
        }, (err, user) => {
            if(err){
                res.error.code = '202';
                res.error.message = 'Cannot get user from DB.';
                res.redirect('/error');
            }

            if(!user){
                res.error.message = 'Username is not registered.';
                return next();
            }

            if(user.password !== req.body.password){
                res.error.message = 'Wrong password!';
                return next();
            }

            req.session.loggedIn = true;
            res.locals.loggedInUser = user;

            res.redirect('/homepage');
        });
    };
 };