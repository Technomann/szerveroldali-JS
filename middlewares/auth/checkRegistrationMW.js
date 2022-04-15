
/**
 * Checks registration data (POST), if correct puts entered data into res and calls next, 
 * if not, put error into res and calls next
 */
const requireOption = require('../utility/requireOption');

 module.exports = function(objectRepository){
    const UserModel = requireOption(objectRepository, 'UserModel');

    return function(req, res, next){
        if((typeof req.body === 'undefined')){
            res.locals.error.message = 'Body para!';
            return next();
        }
        if(
        (typeof req.body.usernamereg === 'undefined')){
            console.log(req.body.usernamereg);
            res.locals.error.message = 'Username para!';
            return next();
        }else if((typeof req.body.emailreg === 'undefined')){
            res.locals.error.message = 'EMail para!';
            return next();
        }else if((typeof req.body.passwordreg === 'undefined')){
            res.locals.error.message = 'password para!';
            return next();
        }else if((typeof req.body.passwordagainreg === 'undefined')){
            res.locals.error.message = 'again para';
            return next();
        }
         
        
        {
            res.locals.error.message = 'Please provide all the necessary data!';
            return next();
        }

        if(req.body.username.length < 3){
            res.locals.error.message = 'The username must be at least 3 characters long!';
            return next();
        }

        if(!req.body.email.includes('@')){
            res.locals.error.message = 'Please provide a valid e-mail address!';
            return next();
        }

        if(req.body.password !== req.body.passwordagain){
            res.locals.error.message = 'The passwords should match!';
            return next();
        }

        UserModel.findOne({
            email: req.body.email
        }, (err, user) => {
            if(err){
                res.locals.error.code = '765';
                res.locals.error.message = 'Cannot get user from DB';
                return res.redirect('/error');
            }

            if(user !== null){
                res.locals.error.message = 'E-mail already registered.';
                res.locals.user = {
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password
                };
                return next();
            }

            UserModel.findOne({
                username: req.body.username
            }, (err, user) => {
                if(err){
                    res.locals.error.code = '766';
                    res.locals.error.message = 'Cannot get user from DB';
                    return res.redirect('/error');
                }
    
                if(user !== null){
                    res.locals.error.message = 'Username already registered.';
                    res.locals.user = {
                        username: req.body.username,
                        email: req.body.email,
                        password: req.body.password
                    };
                    return next();
                }

                let newUser = new UserModel();
                newUser.username = req.body.username;
                newUser.email = req.body.email;
                newUser.password = req.body.password;
                newUser.save((err) => {
                    if(err){
                        res.locals.error.code = '777';
                        res.locals.error.message = 'Cannot save user to database!';
                        return res.redirect('/error');
                    }

                    return res.redirect('/login');
                });
            })
        });
    };
 };