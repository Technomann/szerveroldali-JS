
/**
 * Gets comment from db by Id and puts into locals then calls next
 */
 const reuireOption = require('../utility/requireOption');

 module.exports = function(objectRepository){
     return function(req, res, next){
        CommentModel.findOne({_id: req.params.commentid}, (err, comment) => {
            if(err || !comment){
                res.error.code = '900';
                res.error.message = 'Cannot get comment!';
                res.redirect('/error');
            }

            res.locals.comment = comment;
            next();
        });
     };
 };