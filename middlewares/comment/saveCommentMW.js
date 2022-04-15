
/**
 * If POST: saves new comment for specific spacecraft into db, if something is wrong, puts error into locals and calls next
 * If GET: calls next
 */
const requireOption = require('../utility/requireOption');

 module.exports = function(objectRepository){
    const CommentModel = requireOption(objectRepository, 'CommentModel');

    return function(req, res, next){
        if(typeof req.body === 'undefined'){
            return next();
        }

        if((typeof req.body.title === 'undefined') || 
        (typeof req.body.text === 'undefined') ||
        (typeof req.body.rating === 'undefined')){
            res.error.message = 'Please provide all data!';
            return next();
        }

        res.locals.comment.title = req.body.title;
        res.locals.comment.text = req.body.text;
        res.locals.comment.date = Date.now();
        res.locals.comment.author = res.locals.loggedInUser;
        res.locals.comment.spacecraft = res.locals.spacecraft;

        if(req.body.rating > 5 || req.body.rating < 1){
            res.error.message = 'Rating must be from 1 to 5!';
            return next();
        }

        if(req.body.title.length < 3|| req.body.text.length < 3){
            res.error.message = 'Title and comment must be at least 3 characters long! ';
            return next();
        }

        if(typeof res.locals.comment === 'undefined'){
            res.locals.comment = new CommentModel();
        }

        res.locals.comment.title = req.body.title;
        res.locals.comment.text = req.body.text;
        res.locals.comment.date = Date.now();
        res.locals.comment.author = res.locals.loggedInUser;
        res.locals.comment.spacecraft = res.locals.spacecraft;

        //req.body.rating-el kezdeni kell valamit!!

        res.locals.comment.save((err) => {
            if(err){
                res.error.code = '777';
                res.error.message = 'Cannot save comment to DB.';
                return res.redirect('/error');
            }

            return res.redirect('/spacecraft/' + res.locals.spacecraft._id + '/details');
        })
    };
 };