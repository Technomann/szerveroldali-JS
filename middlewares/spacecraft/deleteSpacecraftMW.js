
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
                    res.error.message = 'Comment deletion not succesfull. ID=' + comment._id;
                    res.error.code = '669';
                    return res.redirect('/error');
                }
            });
        }, (err) => {
            if(err){
                res.error.message = 'Comment deletion not succesfull.'
                res.error.code = '677';
                res.redirect('/error');
            }else{
                const path = './static/assets/spacecrafts/' + res.locals.spacecraft.imageName;

                res.locals.spacecraft.remove((err) => {
                    if(err){
                        res.error.message = 'Spacecraft deletion not succesfull.'
                        res.error.code = '669';
                        return res.redirect('/error');
                    }
                    
                    fs.unlink(path, (err) => {
                        res.error.code = '111';
                        res.error.message = 'Cannot remove image: ' + path;
                    });
                });
            }
        });

        return res.redirect('/list');
    };
};
