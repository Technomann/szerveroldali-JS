
/**
 * Get all comments for specific spacecraft or spacecrafts by spacecraftId and puts them into locals and calls next
 */
 const requireOption = require('../utility/requireOption');
 const mongoose = require('mongoose');

 module.exports = function(objectRepository){
    const CommentModel = requireOption(objectRepository, 'CommentModel');
    
    return function(req, res, next){
        CommentModel.find({spacecraft: res.locals.spacecraft._id}, (err, comments) => {
            if(err){
                res.locals.error.code = '988';
                res.locals.error.message = 'Cannot get comment.';
                res.redirect('/error');
            }

            res.locals.spacecraft.comments = comments;
            return next();
        });
    };
 };