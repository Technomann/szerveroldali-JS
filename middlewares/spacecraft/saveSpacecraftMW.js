
/**
 * If POST: saves new spacecraft into db, if something is wrong, puts error into locals and calls next
 * If GET: calls next
 */
 const requireOption = require('../utility/requireOption');

 module.exports = function(objectRepository){
    const SpacecraftModel = requireOption(objectRepository, 'SpacecraftModel');

    return function(req, res, next){
        //CHECK IF HTTP GET
        if(req.method === 'GET')
            return next();
        
        //CHECK IF USER PROVIDED ALL THE NECESSARY DATA
        if((typeof req.body.name === 'undefined') ||
        (typeof req.body.manufacturer === 'undefined') ||
        (typeof req.body.price === 'undefined') ||
        (typeof req.body.passengers === 'undefined') ||
        (typeof req.body.type === 'undefined') ||
        (typeof req.body.length === 'undefined') ||
        (typeof req.body.width === 'undefined') ||
        (typeof req.body.engine === 'undefined') ||
        (typeof req.body.hyperdrive === 'undefined') ||
        (typeof req.body.cargocapacity === 'undefined') ||
        (typeof req.body.maxspeed === 'undefined')){
            res.locals.error.code = '729';
            res.locals.error.message = 'Not properly filled credentials.';
            return res.redirect('/error');
        }

        //CHECK IF IT IS A NEW SPACECRAFT
        if(req.url.includes('new')){
            res.locals.spacecraft = new SpacecraftModel();
            res.locals.spacecraft.ratingSum = 0;
            res.locals.spacecraft.ratingAmount = 0;
            res.locals.spacecraft.imageName = req.file.filename;
        }

        //SET ALL THE BORING DATA
        res.locals.spacecraft.name = req.body.name;
        res.locals.spacecraft.manufacturer = req.body.manufacturer;
        res.locals.spacecraft.price = req.body.price;
        res.locals.spacecraft.passengers = req.body.passengers;
        res.locals.spacecraft.type = req.body.type;
        res.locals.spacecraft.length = req.body.length;
        res.locals.spacecraft.width = req.body.width;
        res.locals.spacecraft.engine = req.body.engine;
        res.locals.spacecraft.hyperdrive = req.body.hyperdrive;
        res.locals.spacecraft.cargoCapacity = req.body.cargocapacity;
        res.locals.spacecraft.maxSpeed = req.body.maxspeed;
        res.locals.spacecraft.author = res.locals.loggedInUser;
        res.locals.spacecraft.authorName = res.locals.loggedInUser.username;

        //SAVE SPACECRAFT INTO DB
        res.locals.spacecraft.save((err) => {
            if(err){
                res.locals.error.code = '730';
                res.locals.error.message = 'Cannot save sapcecraft into DB.';
                return res.redirect('/error');
            }

            return res.redirect('/spacecraft/' + res.locals.spacecraft._id + '/details');
        });
    };
 };