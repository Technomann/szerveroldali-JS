
/**
 * If POST: saves new comment for specific spacecraft into db, if something is wrong, puts error into locals and calls next
 * If GET: calls next
 */
const requireOption = require('../utility/requireOption');
const async = require('async');

 module.exports = function(objectRepository){
    const CommentModel = requireOption(objectRepository, 'CommentModel');

    return function(req, res, next){
        //CHECK IF HTTP GET
        if(req.method === 'GET'){
            return next();
        }

        //USER SENDS NOT ENOUGH DATA
        if((typeof req.body.title === 'undefined') || 
        (typeof req.body.text === 'undefined') ||
        (typeof req.body.rating === 'undefined')){
            res.locals.error.message = 'Please provide all data!';
            return next();
        }

        //RATING DOMAIN NOT CORRECT
        if(req.body.rating > 5 || req.body.rating < 1){
            res.locals.error.message = 'Rating must be from 1 to 5!';
            return next();
        }

        //TITLE OR TEST NOT LONG ENOUGH
        if(req.body.title.length < 3 || req.body.text.length < 3){
            res.locals.error.message = 'Title and comment must be at least 3 characters long! ';
            return next();
        }

        //IF ITS NEW COMMENT -> CREATE NEW ONE, SET AUTHOR AND SPACECRAFT
        if(req.url.includes('new')){
            res.locals.comment = new CommentModel();
            res.locals.comment.author = res.locals.loggedInUser;
            res.locals.comment.spacecraft = res.locals.spacecraft;
        }

        //PROVIDE COMMENT DATA
        res.locals.comment.title = req.body.title;
        res.locals.comment.text = req.body.text;
        res.locals.comment.date = Date.now();

        //ADJUST SPACECRAFT RATING
        res.locals.spacecraft.ratingSum = parseInt(res.locals.spacecraft.ratingSum) + parseInt(req.body.rating);
        res.locals.spacecraft.ratingAmount++;

        //SAVE SPACECRAFT AND COMMENT PARALLEL
        async.parallel([
            //SAVE COMMENT INTO DB
            (callback) => {
                res.locals.comment.save((err) => {
                    if(err){
                        res.locals.error.code = '716';
                        res.locals.error.message = 'Cannot save comment into DB.';
                        return res.redirect('/error');
                    }
                    callback(err);
                })
            },
            //SAVE RATING MODIFIED SPACECRAFT
            (callback) => {
                res.locals.spacecraft.save((err) => {
                    if(err){
                        res.locals.error.code = '717';
                        res.locals.error.message = 'Cannot save spaceceaft to DB.';
                        return res.redirect('/error');
                    }
                    callback(err);
                })
            } 
        ], (err) => {
            if(err){
                res.locals.error.code = '718';
                res.locals.error.message = 'Error during async.parallel.';
                return res.redirect('/error');
            }
            return res.redirect('/spacecraft/' + res.locals.spacecraft._id + '/details');
        });
    };
 };