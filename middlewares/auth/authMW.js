
/**
 * IF THE USER IS AUTHENTICATED PUTS THE LOGGED IN USER INTO LOCALS AND CALLS NEXT
 */

module.exports = function(objectRepository){
    return function(req, res, next){
        //AUTHENTICATE
        if(typeof req.session.loggedIn === 'undefined' || req.session.loggedIn !== true){
            res.locals.error.code = '701';
            res.locals.error.message = 'You are not logged in!';
            return res.redirect('/error');
        }

        //PUTS LOGGED IN USER INTO LOCALS
        res.locals.loggedInUser = req.session.loggedInUser;
        return next();
    };
};