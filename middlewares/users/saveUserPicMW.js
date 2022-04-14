
/**
 * Save users new picture
 */
const requireOption = require('../utility/requireOption');

module.exports = function(objectRepository){
    return function(req, res, next){
        if(typeof res.locals.user === 'undefined'){
            res.error.code = '555';
            res.error.message = 'User not found!';
            return res.redirect('/error');
        }

        res.locals.user.imageName = req.file.filename;
        res.locals.user.save((err) => {
            if(err){
                res.error.code = '554';
                res.error.message = 'Cannot save user into DB!';
                return res.redirect('/error');
            }
        });
    };
};
