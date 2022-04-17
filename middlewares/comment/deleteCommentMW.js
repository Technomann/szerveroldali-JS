
/**
 * Deletes comment based on id, then redirects to /spacecraft/:spacecraftid/details
 */
 const requireOption = require('../utility/requireOption');

 module.exports = function(objectRepository){
    return function(req, res, next){
        if(typeof res.locals.comment === 'undefined'){
            res.locals.error.code = '905';
            res.locals.error.message = 'Res comments undefined!';
            return res.redirect('/error');
        }

        res.locals.comment.remove((err) => {
            if(err){
                res.locals.error.code = '907';
                res.locals.error.message = 'Cannot delete comment.';
                return res.redirect('/error');
            }
            return res.redirect('/spacecraft/' + req.params.spacecraftid + '/details');
        });
    };
 };