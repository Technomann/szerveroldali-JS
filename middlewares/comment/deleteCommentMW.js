
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

        const commentForDelete = res.locals.comments.find((comment) => {
            comment._id == req.params.commentid;
        });

        if(typeof commentForDelete === 'undefined'){
            res.error.code = '906';
            res.error.message = 'No such comment.';
            res.redirect('/error');
        }

        commentForDelete.remove((err) => {
            if(err){
                res.error.code = '907';
                res.error.message = 'Cannot delete comment.';
                res.redirect('/error');
            }
        });

        res.redirect('/spacecraft/' + req.params.spacecraftid + '/details');
    };
 };