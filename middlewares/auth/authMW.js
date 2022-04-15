
/**
 * If the user is authenticated calls next, otherwise redirets to /
 */
const requireOption = require('../utility/requireOption');

module.exports = function(objectRepository){
    return function(req, res, next){
        if(typeof req.session.loggedIn === 'undefined' || req.session.loggedIn !== true){
            res.locals.error.code = '666';
            res.locals.error.message = 'You are not logged in!';
            return res.redirect('/error');
        }

        res.locals.loggedInUser = req.session.loggedInUser;
        return next();
    };
};