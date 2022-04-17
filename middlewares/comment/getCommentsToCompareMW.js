/**
 * GETS COMMENTS FOR COMPARABLE SPACECRAFTS AND CALLS NEXT
 */
 const requireOption = require('../utility/requireOption');
 const async = require('async');

 module.exports = function(objectRepository){
    const CommentModel = requireOption(objectRepository, 'CommentModel');

    return async function(req, res, next){
        //CHECK IF SPACECRAFTS PROVIDED FOR COMPARISON
        if(typeof res.locals.spacecraftA === 'undefined' || typeof res.locals.spacecraftB === 'undefined'){
            res.locals.error.code = '712';
            res.locals.error.message = 'Spacecrafts did not arrive to comparison.';
            return res.redirect('/error');
        }

        async.parallel([
            //GET COMMENTS FOR FIRST SPACECRAFT
            (callback) => {
                CommentModel.find({spacecraft: res.locals.spacecraftA._id}, (err, commentsA) => {
                    if(err){
                        res.locals.error.code = '713';
                        res.locals.error.message = 'Cannot get comments for spacecraft A.';
                        return res.redirect('/error');
                    }
                    res.locals.spacecraftA.comments = commentsA;
                    return callback(err);
                });
            },
            //GET COMMENTS FOR SECOND SPACECRAFT
            (callback) => {
                CommentModel.find({spacecraft: res.locals.spacecraftB._id}, (err, commentsB) => {
                    if(err){
                        res.locals.error.code = '714';
                        res.locals.error.message = 'Cannot get comments for spacecraft B.';
                        return res.redirect('/error');
                    }
    
                    res.locals.spacecraftB.comments = commentsB;
                    return callback(err);
                });
            }
        ], (err) => {
            //CHECK IF SOME OF ASYNC THROWN ERROR
            if(err){
                res.locals.error.code = '715';
                res.locals.error.message = 'Error during async.parallel.';
                return res.redirect('/error');
            }
            return next();
        });
    };
 };