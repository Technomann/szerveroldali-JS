
/**
 * GET COMMENT BASED ON ID, PUTS INTO LOCALS AND CALLS NEXT
 */
 const requireOption = require('../utility/requireOption');

 module.exports = function(objectRepository){
    const CommentModel = requireOption(objectRepository, 'CommentModel');

     return function(req, res, next){
        //QUERIES COMMENT FROM DB BY ID
        CommentModel.findOne({_id: req.params.commentid}, (err, comment) => {
            if(err || !comment){
                res.locals.error.code = '710';
                res.locals.error.message = 'Cannot get comment from DB.';
                return res.redirect('/error');
            }

            res.locals.comment = comment;
            return next();
        });
     };
 };