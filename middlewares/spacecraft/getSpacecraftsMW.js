
/**
 * GETS ALL SPACECRAFTS FROM DB PUTS THEM INTO LOCALS AND CALLS NEXT
 */
 const requireOption = require('../utility/requireOption');

 module.exports = function(objectRepository){
    const SpacecraftModel = requireOption(objectRepository, 'SpacecraftModel');

    return function(req, res, next){
        //QUERY ALL SPACECRAFTS
        SpacecraftModel.find({}, (err, spacecrafts) => {
            if(err){
                res.locals.error.code = "725";
                res.locals.error.message = "Error during getting Spacecrafts from DB.";
                return res.redirect('/error');
            }
            res.locals.spacecrafts = spacecrafts;
            return next();
        });
    };
 };
