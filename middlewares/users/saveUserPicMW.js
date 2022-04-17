
/**
 * SAVES USER'S NEW PICTURE AND REDIRECT TO /LIST
 */

module.exports = function(objectRepository){
    return function(req, res, next){
        //CHECK IF PREVIOUS MW FOUND USER (IT SHOULD, BECAUSE IT IS AN INTERNAL CALL)
        if(typeof res.locals.user === 'undefined'){
            res.locals.error.code = '731';
            res.locals.error.message = 'No such email registered.';
            return res.redirect('/error');
        }

        //SET IMAGE PROPERTIES ON USER
        res.locals.user.imageName = req.file.filename;
        req.session.loggedInUser = res.locals.user;
        res.locals.loggedInUser = res.locals.user;

        //SAVE MODIFIED USER INTO DB
        res.locals.user.save((err) => {
            if(err){
                res.locals.error.code = '732';
                res.locals.error.message = 'Cannot save user into DB.';
                return res.redirect('/error');
            }

            return res.redirect('/list');
        });
    };
};
