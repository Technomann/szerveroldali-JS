
/**
 * If the user is authenticated calls next, otherwise redirets to /
 */
const reuireOption = require('../utility/requireOption');

module.exports = function(objectRepository){
    return function(req, res, next){
        if(typeof req.session.loggedIn === 'undefined' || req.session.loggedIn !== true){
            res.locals.errorCode = '666';
            res.locals.errorProblem = 'You are not logged in!';
            return res.redirect('/error');
        }
        next();
    };
};