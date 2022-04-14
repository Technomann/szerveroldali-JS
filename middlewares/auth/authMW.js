
/**
 * If the user is authenticated calls next, otherwise redirets to /
 */
const requireOption = require('../utility/requireOption');

module.exports = function(objectRepository){
    return function(req, res, next){
        if(typeof req.session.loggedIn === 'undefined' || req.session.loggedIn !== true){
            res.error.code = '666';
            res.error.message = 'You are not logged in!';
            return res.redirect('/error');
        }
        next();
    };
};