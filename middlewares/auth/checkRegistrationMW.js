
/**
 * CHECKS REGISTRATION DATA AND IF USER ALREADY EXISTS THEN REDIRECTS BACK TO LOGIN FORM
 */
const requireOption = require('../utility/requireOption');

 module.exports = function(objectRepository){
    const UserModel = requireOption(objectRepository, 'UserModel');

    return function(req, res, next){
        if((typeof req.body === 'undefined') ||
         (typeof req.body.username === 'undefined') ||
         (typeof req.body.email === 'undefined') ||
         (typeof req.body.password === 'undefined') ||
         (typeof req.body.passwordagain === 'undefined')){
            res.locals.error.code = '704';
            res.locals.error.message = 'Not properly filled credentials.';
            return next();
        }

        //USERNAME IS SHORTER THAN 3 CHARACTERS
        if(req.body.username.length < 3){
            res.locals.error.message = 'The username must be at least 3 characters long!';
            return next();
        }

        //E-MAIL DOES NOT INCLUDE @ SIGN
        if(!req.body.email.includes('@')){
            res.locals.error.message = 'Please provide a valid e-mail address!';
            return next();
        }

        //PASSWORD AND RE-TYPED PASSWORD DO NOT MATCH
        if(req.body.password !== req.body.passwordagain){
            res.locals.error.message = 'The passwords should match!';
            return next();
        }

        //QUERY FOR USER - PERHAPS ALREADY EXISTS
        UserModel.findOne({
            //FIRST QUERY BY EMAIL
            email: req.body.email
        }, (err, user) => {
            if(err){
                res.locals.error.code = '765';
                res.locals.error.message = 'Cannot get user from DB';
                return res.redirect('/error');
            }

            //IF USER EXISTS ALREADY NOTIFY CLIENT SIDE
            if(user !== null){
                res.locals.error.message = 'E-mail already registered.';
                res.locals.user = {
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password
                };
                return next();
            }

            //QUERY FOR USER - PERHAPS ALREADY EXISTS
            UserModel.findOne({
                //SECOND QUERY BY USERNAME
                username: req.body.username
            }, (err, user) => {
                if(err){
                    res.locals.error.code = '766';
                    res.locals.error.message = 'Cannot get user from DB';
                    return res.redirect('/error');
                }
    
                //IF USER EXISTS ALREADY NOTIFY CLIENT SIDE
                if(user !== null){
                    res.locals.error.message = 'Username already registered.';
                    res.locals.user = {
                        username: req.body.username,
                        email: req.body.email,
                        password: req.body.password
                    };
                    return next();
                }

                //IF USER DOES NOT EXIST YET, CREATE IT AND SAVE TO DB
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

                    //NOTIFY CLIENT SIDE THAT REGISTRATION IS SUCCESSFULL
                    res.locals.error.message = 'Registration succesfull! Please log in!';
                    return res.redirect('/');
                });
            })
        });
    };
 };