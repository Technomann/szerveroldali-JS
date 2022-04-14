
/**
 * Get all comments for specific spacecraft or spacecrafts by spacecraftId and puts them into locals and calls next
 */
 const reuireOption = require('../utility/requireOption');

 module.exports = function(objectRepository){
     return function(req, res, next){
        CommentModel.find({_id: res.locals.spacecraft._id}, (err, comments) => {
            if(err){
                res.error.code = '988';
                res.error.message = 'Cannot get comment.';
                res.redirect('/error');
            }

            res.locals.comments = comments;
            return next();
        });
     };
 };