
/**
 * Logs the user out (delete session data??) and redirects to /
 */
 const requireOption = require('../utility/requireOption');

 module.exports = function(objectRepository){
    return function(req, res, next){
        req.session.destroy((err) => {
            res.redirect('/');
        });
    };
 };