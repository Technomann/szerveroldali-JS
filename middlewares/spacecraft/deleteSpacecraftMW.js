
/**
 * Deletes spacecraft from db by id and redirects to /spacecrafts/list
 */
const requireOption = require('../utility/requireOption');
const async = require('async');
const fs = require('fs');

module.exports = function(objectRepository){
    return async function(req, res, next){
        if(typeof res.locals.spacecraft === 'undefined' || typeof res.locals.comments === 'undefined'){
            return next();
        }

        async.eachSeries(res.locals.comments, (comment) =>{
            comment.remove((err) => {
                if(err){
                    res.locals.error.message = 'Comment deletion not succesfull. ID=' + comment._id;
                    res.locals.error.code = '669';
                    return res.redirect('/error');
                }
            });
        }, (err) => {
            if(err){
                res.locals.error.message = 'Comment deletion not succesfull.'
                res.locals.error.code = '677';
                return res.redirect('/error');
            }else{
                const path = './static/assets/spacecrafts/' + res.locals.spacecraft.imageName;

                res.locals.spacecraft.remove((err) => {
                    if(err){
                        res.locals.error.message = 'Spacecraft deletion not succesfull.'
                        res.locals.error.code = '669';
                        return res.redirect('/error');
                    }
                    
                    fs.unlink(path, (err) => {
                        res.locals.error.code = '111';
                        res.locals.error.message = 'Cannot remove image: ' + path;
                        return res.redirect('/error');
                    });
                });
            }
        });

        return res.redirect('/list');
    };
};
