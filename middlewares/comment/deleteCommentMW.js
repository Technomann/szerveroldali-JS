
/**
 * DELETES COMMENT BASED ON ID AND REDIRECTS TO /spacecraft/:spacecraftid/details
 */

 module.exports = function(objectRepository){
    return function(req, res, next){
        //CHECK IF DELETABLE COMMENT IS PROVIDED
        if(typeof res.locals.comment === 'undefined'){
            res.locals.error.code = '708';
            res.locals.error.message = 'Res comments undefined!';
            return res.redirect('/error');
        }

        //DELETE THE COMMENT 
        res.locals.comment.remove((err) => {
            if(err){
                res.locals.error.code = '709';
                res.locals.error.message = 'Cannot delete comment from DB.';
                return res.redirect('/error');
            }
            return res.redirect('/spacecraft/' + req.params.spacecraftid + '/details');
        });
    };
 };