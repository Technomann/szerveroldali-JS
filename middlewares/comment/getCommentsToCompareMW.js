/**
 * Gets comments from db for comparison
 */
 const reuireOption = require('../utility/requireOption');
 const async = require('async');

 module.exports = function(objectRepository){
     return async function(req, res, next){
        async.parallel([
            CommentModel.find({_id: res.locals.spacecraftA._id}, (err, commentsA) => {
                if(err){
                    res.error.code = '989';
                    res.error.message = 'Cannot get comments for spacecraft A.';
                    res.redirect('/error');
                }

                res.locals.spacecraftA.comments = commentsA;
            }),
            CommentModel.find({_id: res.locals.spacecraftB._id}, (err, commentsB) => {
                if(err){
                    res.error.code = '990';
                    res.error.message = 'Cannot get comments for spacecraft B.';
                    res.redirect('/error');
                }

                res.locals.spacecraftB.comments = commentsB;
            })
        ]);

        return next();
     };
 };