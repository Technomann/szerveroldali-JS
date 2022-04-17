
/**
 * GET ALL COMMENTS FOR SPECIFIC SPACECRAFT BY ID, PUT THEM INTO LOCALS AND CALLS NEXT
 */
 const requireOption = require('../utility/requireOption');

 module.exports = function(objectRepository){
    const CommentModel = requireOption(objectRepository, 'CommentModel');
    
    return function(req, res, next){
        //QUERY COMMENTS
        CommentModel.find({spacecraft: req.params.spacecraftid}, (err, comments) => {
            if(err){
                res.locals.error.code = '711';
                res.locals.error.message = 'Cannot get comments from DB.';
                res.redirect('/error');
            }

            res.locals.spacecraft.comments = comments;
            return next();
        });
    };
 };