
/**
 * Gets two spacecrafts from db and calls next
 */
 const reuireOption = require('../utility/requireOption');
 const async = require('async');

 module.exports = function(objectRepository){
    return async function(req, res, next){
        await async.parallel([
            SpacecraftModel.find({_id: req.params.idA}, (err, spacecraftA) => {
                if(err){
                    res.error.code = '991';
                    res.error.message = 'Cannot get sapcecraft A.';
                    res.redirect('/error');
                }
                res.locals.spacecraftA = spacecraftA;
            }),
            SpacecraftModel.find({_id: req.params.idB}, (err, spacecraftB) => {
                if(err){
                    res.error.code = '992';
                    res.error.message = 'Cannot get sapcecraft B.';
                    res.redirect('/error');
                }
                res.locals.spacecraftB = spacecraftB;
            }),
        ]);
        return next();
    };
 };