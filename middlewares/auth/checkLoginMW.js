
/**
 * CHECKS IF THE LOGIN CREDENTIALS ARE CORRECT. IF USER IS NOT REGISTERED, SETS ERROR MESSAGE AND CALLS NEXT.
 * IF PASSWORD IS INCORRECT, SETS ERROR MESSAGE AND CALLS NEXT. IF EVERYTHING IS FINE, INITIALIZES SESSION AND REDIRECTS TO /HOMEPAGE
 */
 const requireOption = require('../utility/requireOption');

 module.exports = function(objectRepository){
    const UserModel = requireOption(objectRepository, 'UserModel');

    return function(req, res, next){
        //CHECK IS DATA HAS BEEN SENT
        if((typeof req.body === 'undefined') ||
         (typeof req.body.username === 'undefined') ||
         (typeof req.body.password === 'undefined')){
            res.locals.error.code = '702';
            res.locals.error.message = 'Not properly filled credentials.';
            return res.redirect('/error');
        }

        //QUERY THE USER BY EMAIL
        UserModel.findOne({
            username: req.body.username
        }, (err, user) => {
            if(err){
                res.locals.error.code = '703';
                res.locals.error.message = 'Cannot get user from DB.';
                return res.redirect('/error');
            }

            //CHECK IF THERE IS SUCH USER BY USERNAME
            if(!user){
                res.locals.error.message = 'Username is not registered.';
                res.locals.user = {
                    username: req.body.username,
                    password: req.body.password
                };
                return next();
            }

            //CHECK IF PASSWORD IS CORRECT
            if(user.password !== req.body.password){
                res.locals.error.message = 'Wrong password!';
                res.locals.user = {
                    username: req.body.username,
                    password: req.body.password
                };
                return next();
            }

            //INITIALIZE SESSION
            req.session.loggedIn = true;
            req.session.loggedInUser = user;

            return res.redirect('/homepage');
        });
    };
 };