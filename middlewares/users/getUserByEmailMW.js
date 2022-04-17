
/**
 * GETS USER BY EMAIL FROM DB. IF NO SUCH USER, RES.LOCALS.USER WILL BE UNDEFINED. CHECKS IF EMAIL WAS PROVIDED AT HTTP POST
 */
 const requireOption = require('../utility/requireOption');

 module.exports = function(objectRepository){
    const UserModel = requireOption(objectRepository, 'UserModel');

     return function(req, res, next){
        //IF HTTP GET, CALL NEXT FOR NEXT MW (FORGOT PASSWORD)
        if(req.method === 'GET')
            return next();

        if(typeof req.body === 'undefined'){
            res.locals.error.code = '705';
            res.locals.error.message = 'Not properly filled credentials.';
            return res.redirect('/error');
        }

        /*if(typeof req.body.email === 'undefined' && typeof req.session.loggedInUser === 'undefined'){
            return next();
        }*/

        //QUERY FOR ONE USER
        UserModel.findOne({
            //IF MW IS CALLED FROM FORGOT PASSWORD, THEN USER BODY PARAMETERS, OTHERWISE USE loggedInUser'S EMAIL
            email: req.url.includes('forgot') ? req.body.email : req.session.loggedInUser.email
        }, (err, user) => {
            if(err){
                res.locals.error.code = '706';
                res.locals.error.message = 'Cannot get user from DB.';
                return res.redirect('/error');
            }

            //IF USER EXISTS PUT IT INTO LOCALS
            if(user !== null)
                res.locals.user = user;
            
            return next();
        });
     };
 };