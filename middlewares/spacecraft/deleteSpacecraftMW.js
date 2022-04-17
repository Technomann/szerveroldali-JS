
/**
 * DELETES SPACECRAFT FROM DB BY ID AND RELATED COMMENTS TOO. AFTER REDIRECTS TO /LIST
 */
const async = require('async');
const fs = require('fs');

module.exports = function(objectRepository){
    return async function(req, res, next){
        //CHECK IS SPACECRAFT OR COMMENTS NOT PROVIDED BY PREVIOUS MW
        if(typeof res.locals.spacecraft === 'undefined' || typeof res.locals.spacecraft.comments === 'undefined'){
            res.locals.error.message = 'Spacecraft or comments were not provided.';
            res.locals.error.code = '719';
            return res.redirect('/error');
        }

        //DELETE COMMENTS ONE BY ONE
        async.eachSeries(res.locals.spacecraft.comments, (comment, callback) =>{
            //DELETE ITERATEE COMMENT
            comment.remove((err) => {
                if(err){
                    res.locals.error.message = 'Comment deletion not succesfull. ID=' + comment._id;
                    res.locals.error.code = '720';
                    return res.redirect('/error');
                }
                callback(err);
            });
        }, (err) => {
            if(err){
                res.locals.error.message = 'Error during async.eachseries.'
                res.locals.error.code = '721';
                return res.redirect('/error');
            }else{
                //PROVIDE PHOTO PATH RELATED TO SPACECRAFT
                const path = './static/assets/spacecrafts/' + res.locals.spacecraft.imageName;

                //DELETE SPACECRAFT
                res.locals.spacecraft.remove((err) => {
                    if(err){
                        res.locals.error.message = 'Spacecraft deletion not succesfull.'
                        res.locals.error.code = '722';
                        return res.redirect('/error');
                    }
                    
                    //DELETE PHOTO
                    fs.unlink(path, (err) => {
                        if(err){
                            res.locals.error.code = '723';
                            res.locals.error.message = 'Cannot remove image: ' + path;
                            return res.redirect('/error');
                        }
                        return res.redirect('/list');
                    });                    
                });
            }
        });
    };
};
