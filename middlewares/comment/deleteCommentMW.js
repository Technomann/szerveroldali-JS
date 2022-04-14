
/**
 * Deletes comment based on id, then redirects to /spacecraft/:spacecraftid/details
 */
 const requireOption = require('../utility/requireOption');

 module.exports = function(objectRepository){
    return function(req, res, next){
        if(typeof res.locals.comments === 'undefined'){
            res.error.code = '905';
            res.error.message = 'Res comments undefined!';
            res.redirect('/error');
        }

        res.locals.comment.remove((err) => {
            if(err){
                res.error.code = '907';
                res.error.message = 'Cannot delete comment.';
                res.redirect('/error');
            }
        });

        res.redirect('/spacecraft/' + req.params.spacecraftid + '/details');
    };
 };