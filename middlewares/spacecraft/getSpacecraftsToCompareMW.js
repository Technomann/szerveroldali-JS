
/**
 * GETS TWO SPACECRAFTS FROM DB FOR COMPARISON WITH ASYNC.PARALLEL AND CALLS NEXT
 */
 const requireOption = require('../utility/requireOption');
 const async = require('async');

 module.exports = function(objectRepository){
    const SpacecraftModel = requireOption(objectRepository, 'SpacecraftModel');

    return async function(req, res, next){
        async.parallel([
            //GET THE FIRST SPACECRAFT
            (callback) => {
                SpacecraftModel.findOne({_id: req.params.idA}, (err, spacecraftA) => {
                    if(err){
                        res.locals.error.code = '726';
                        res.locals.error.message = 'Cannot get sapcecraft A from DB.';
                        return res.redirect('/error');
                    }
                    res.locals.spacecraftA = spacecraftA;
                    return callback(err);
                });
            },
            //GET THE SECOND SPACECRAFT
            (callback) => {
                SpacecraftModel.findOne({_id: req.params.idB}, (err, spacecraftB) => {
                    if(err){
                        res.locals.error.code = '727';
                        res.locals.error.message = 'Cannot get sapcecraft B from DB.';
                        return res.redirect('/error');
                    }
                    res.locals.spacecraftB = spacecraftB;
                    return callback(err);
                });
            }
        ], (err) => {
            //CHECK FOR ERROR
            if(err){
                res.locals.error.code = '728';
                res.locals.error.message = 'Error during asnyc.parallel.';
                return res.redirect('/error');
            }
            return next();
        });
    };
 };