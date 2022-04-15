
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

        if((typeof req.body.name === 'undefined') ||
        (typeof req.body.manufacturer === 'undefined') ||
        (typeof req.body.price === 'undefined') ||
        (typeof req.body.passengers === 'undefined') ||
        (typeof req.body.type === 'undefined') ||
        (typeof req.body.length === 'undefined') ||
        (typeof req.body.width === 'undefined') ||
        (typeof req.body.engine === 'undefined') ||
        (typeof req.body.hyperdrive === 'undefined') ||
        (typeof req.body.cargoCapacity === 'undefined') ||
        (typeof req.body.maxSpeed === 'undefined')){
            res.error.message = 'Please provide all the data!';
            return next();
        }

        if(typeof res.locals.spacecraft === 'undefined'){
            res.locals.spacecraft = new SpacecraftModel();
            res.locals.spacecraft.ratingSum = 0;
            res.locals.spacecraft.ratingAmount = 0;
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

        res.locals.spacecraft.save((err) => {
            if(err){
                res.locals.error.code = '437';
                res.locals.error.message = 'Cannot save sapcecraft into DB.';
                return res.redirect('/error');
            }

            return res.redirect('/spacecraft/' + res.locals.spacecraft._id + '/details');
        });
    };
 };