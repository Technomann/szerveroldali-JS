
/**
 * If POST: saves new spacecraft into db, if something is wrong, puts error into locals and calls next
 * If GET: calls next
 */
 const requireOption = require('../utility/requireOption');

 module.exports = function(objectRepository){
    const SpacecraftModel = requireOption(objectRepository, 'SpacecraftModel');

    return function(req, res, next){
        if(typeof req.body === 'undefined'){
            return next();
        }

        //Data megadásának tényének ellenőrzése

        //Data kiírása res.locals-ba, hogy rossz input megadása esetén ne vsszen el a begépelt input

        //Data értékének ellenőrzése, ha kell visszaküldése

        if(typeof res.locals.spacecraft === 'undefined'){
            res.locals.spacecraft = new SpacecraftModel();
        }

        //Data kiírása res.locals-ba
        
        res.locals.spacecraft.save((err) => {
            if(err){
                res.error.code = '437';
                res.error.message = 'Cannot save sapcecraft into DB.';
                return res.redirect('/error');
            }

            return res.redirect('/spacecraft/' + res.locals.spacecraft._id + '/details');
        });


    };
 };