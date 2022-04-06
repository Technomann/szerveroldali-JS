
/**
 * Get all spacecrafts from db and puts them into locals then calls next
 */
 const requireOption = require('../utility/requireOption');
const reuireOption = require('../utility/requireOption');

 module.exports = function(objectRepository){
    const SpacecraftModel = requireOption(objectRepository, 'SpacecraftModel');

     return function(req, res, next){
        SpacecraftModel.find({}, (err, spacecrafts) => {
            if(err){
                res.locals.error.code = "667";
                res.locals.error.message = "Error during getting Spacecrafts";
                res.redirect('/error');
            }

            res.locals.spacecrafts = spacecrafts;
            return next();
        });
     };
 };
