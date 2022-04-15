/**
 * Gets comments from db for comparison
 */
 const requireOption = require('../utility/requireOption');
 const async = require('async');

 module.exports = function(objectRepository){
    const CommentModel = requireOption(objectRepository, 'CommentModel');

    return async function(req, res, next){
        async.parallel([
            CommentModel.find({_id: res.locals.spacecraftA._id}, (err, commentsA) => {
                if(err){
                    res.locals.error.code = '989';
                    res.locals.error.message = 'Cannot get comments for spacecraft A.';
                    return res.redirect('/error');
                }

                res.locals.spacecraftA.comments = commentsA;
            }),
            CommentModel.find({_id: res.locals.spacecraftB._id}, (err, commentsB) => {
                if(err){
                    res.locals.error.code = '990';
                    res.locals.error.message = 'Cannot get comments for spacecraft B.';
                    return res.redirect('/error');
                }

                res.locals.spacecraftB.comments = commentsB;
            })
        ]);

        return next();
    };
 };