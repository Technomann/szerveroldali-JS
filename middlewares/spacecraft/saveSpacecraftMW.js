
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

        if(typeof res.locals.spacecraft === 'undefined'){
            res.locals.spacecraft = new SpacecraftModel();
        }

        res.locals.spacecraft.name = req.body.name;
        res.locals.spacecraft.manufacturer = req.body.manufacturer;
        res.locals.spacecraft.price = req.body.price;
        res.locals.spacecraft.passengers = req.body.passengers;
        res.locals.spacecraft.type = req.body.type;
        res.locals.spacecraft.length = req.body.length;
        res.locals.spacecraft.width = req.body.width;
        res.locals.spacecraft.engine = req.body.engine;
        res.locals.spacecraft.hyperdrive = req.body.hyperdrive;
        res.locals.spacecraft.cargoCapacity = req.body.cargoCapacity;
        res.locals.spacecraft.maxSpeed = req.body.maxSpeed;
        res.locals.spacecraft.imageName = req.file.filename;

        //Data értékének ellenőrzése, ha kell visszaküldése

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