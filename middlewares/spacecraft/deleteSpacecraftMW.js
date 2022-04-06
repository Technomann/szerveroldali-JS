
/**
 * Deletes spacecraft from db by id and redirects to /spacecrafts/list
 */
 const reuireOption = require('../utility/requireOption');

 module.exports = function(objectRepository){
     return function(req, res, next){
        if(typeof res.locals.spacecraft === 'undefined' || typeof res.locals.comments === 'undefined'){
            return next();
        }
        
        res.locals.comments.forEach(item => {
            item.remove((err) => {
                res.error.message = 'Spacecraft deletion not succesfull.'
                res.error.code = '670';
                res.redirect('/error');
            });
            
        });

        res.locals.spacecraft.remove((err) => {
            res.error.message = 'Spacecraft deletion not succesfull.'
            res.error.code = '669';
            res.redirect('/error');
        });

        res.redirect('/list');
     };
 };