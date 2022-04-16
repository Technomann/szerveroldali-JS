
/**
 * Save users new picture
 */
const requireOption = require('../utility/requireOption');

module.exports = function(objectRepository){
    return function(req, res, next){
        if(typeof res.locals.user === 'undefined'){
            res.locals.error.code = '555';
            res.locals.error.message = 'User not found!';
            return res.redirect('/error');
        }

        res.locals.user.imageName = req.file.filename;
        req.session.loggedInUser = res.locals.user;
        res.locals.loggedInUser = res.locals.user;
        res.locals.user.save((err) => {
            if(err){
                res.locals.error.code = '554';
                res.locals.error.message = 'Cannot save user into DB!';
                return res.redirect('/error');
            }

            return res.redirect('/list');
        });
    };
};
