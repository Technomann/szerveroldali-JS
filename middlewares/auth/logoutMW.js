
/**
 * LOGS THE USER OUT AND REDIRECTS TO /
 */

 module.exports = function(objectRepository){
    return function(req, res, next){
        req.session.destroy((err) => {
            return res.redirect('/');
        });
    };
 };