
/**
 * Check user login info (POST), if correct: redirects to /spacecrafts/list, 
 * if not,  sets error on res.locals.error based on error type, give the entered credentials to res and calls next
 */
 const requireOption = require('../utility/requireOption');

 module.exports = function(objectRepository){
    const UserModel = requireOption(objectRepository, 'UserModel');

    return function(req, res, next){
        if((typeof req.body === 'undefined') || (typeof req.body.username === 'undefined') || (typeof req.body.password === 'undefined')){
            res.locals.error.code = '700';
            res.locals.error.message = 'Not properly filled credentials.';
            return res.redirect('/error');
        }

        UserModel.findOne({
            username: req.body.username
        }, (err, user) => {
            if(err){
                res.locals.error.code = '202';
                res.locals.error.message = 'Cannot get user from DB.';
                return res.redirect('/error');
            }

            if(!user){
                res.locals.error.message = 'Username is not registered.';
                res.locals.user = {
                    username: req.body.username,
                    password: req.body.password
                };
                return next();
            }

            if(user.password !== req.body.password){
                res.locals.error.message = 'Wrong password!';
                res.locals.user = {
                    username: req.body.username,
                    password: req.body.password
                };
                return next();
            }

            req.session.loggedIn = true;
            res.locals.loggedInUser = user;

            return res.redirect('/homepage');
        });
    };
 };