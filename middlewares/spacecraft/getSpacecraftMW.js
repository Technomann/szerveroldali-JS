
/**
 * Get spaecraft by id from db and puts into locals then calls next
 */
 const requireOption = require('../utility/requireOption');

 module.exports = function(objectRepository){
    const SpacecraftModel = requireOption(objectRepository, 'SpacecraftModel');

    return function(req, res, next){
        SpacecraftModel.findOne({_id: req.params.spacecraftid}, (err, spacecraft) => {
            if(err || !spacecraft){
                res.locals.error.code = '668';
                res.locals.error.message = 'There is no spacecraft based on this ID in the database!';
                return res.redirect('/error');
            }
            res.locals.spacecraft = spacecraft;
            return next();
        });
    };
 };