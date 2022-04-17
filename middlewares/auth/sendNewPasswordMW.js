
/**
 * Creates new password for user given in locals, writes the pass into db, writes the pass to console
 */
 const randomString = require('randomstring');

 module.exports = function(objectRepository){
    return function(req, res, next){
        //IF HTTP GET CALL NEXT FOR RENDERING
        if(req.method === 'GET')
            return next();

        if(typeof req.body === 'undefined'){
            res.locals.error.code = '707';
            res.locals.error.message = 'REQ.BODY not defined!';
            return res.redirect('/error');
        }

        /*if(typeof req.body.email === 'undefined'){
            return next();
        }*/

        //CHECK IF PREVIOUS MW FOUND USER BY EMAIL, IF NOT, NOTIFY CLIENT SIDE
        if(typeof res.locals.user === 'undefined'){
            res.locals.error.message = 'No such email registered.';
            return next();
        }

        //GENERATE RANDOM ALPHABETICAL STRING - 10 CHARACTERS LONG
        const newPassword = randomString.generate({
            length: 10,
            charset: 'alphabetic'
        });

        //SET NEW PASSWORD FOR USER
        res.locals.user.password = newPassword;
        res.locals.user.save((err) => {
            if(err){
                res.locals.error.code = '433';
                res.locals.error.message = 'Cannot update user.';
                return res.redirect('/error');
            }

            //NOTIFY USER FROM NEW PASSWORD
            console.log(newPassword);
            return res.redirect('/');
        });
    };
 };