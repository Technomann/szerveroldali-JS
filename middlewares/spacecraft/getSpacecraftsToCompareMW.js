
/**
 * Gets two spacecrafts from db and calls next
 */
 const requireOption = require('../utility/requireOption');
 const async = require('async');

 module.exports = function(objectRepository){
    const SpacecraftModel = requireOption(objectRepository, 'SpacecraftModel');

    return async function(req, res, next){
        async.parallel([
            SpacecraftModel.find({_id: req.params.idA}, (err, spacecraftA) => {
                if(err){
                    res.locals.error.code = '991';
                    res.locals.error.message = 'Cannot get sapcecraft A.';
                    return res.redirect('/error');
                }
                res.locals.spacecraftA = spacecraftA;
            }),
            SpacecraftModel.find({_id: req.params.idB}, (err, spacecraftB) => {
                if(err){
                    res.locals.error.code = '992';
                    res.locals.error.message = 'Cannot get sapcecraft B.';
                    return res.redirect('/error');
                }
                res.locals.spacecraftB = spacecraftB;
            }),
        ]);
        return next();
    };
 };