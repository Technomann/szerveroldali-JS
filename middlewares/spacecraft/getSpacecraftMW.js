
/**
 * GETS SPACECRAFT FROM DB BY ID THEN PUTS IT INTO LOCALS AND CALLS NEXT
 */
 const requireOption = require('../utility/requireOption');

 module.exports = function(objectRepository){
    const SpacecraftModel = requireOption(objectRepository, 'SpacecraftModel');

    return function(req, res, next){
        //QUERY FOR SPACECRAFT BY ID
        SpacecraftModel.findOne({_id: req.params.spacecraftid}, (err, spacecraft) => {
            //CHECK IF ERROR HAPPENS OR BAD ID WERE PROVIDED
            if(err || !spacecraft){
                res.locals.error.code = '724';
                res.locals.error.message = 'There is no spacecraft based on this ID in the database or error in DB!';
                return res.redirect('/error');
            }
            res.locals.spacecraft = spacecraft;
            return next();
        });
    };
 };