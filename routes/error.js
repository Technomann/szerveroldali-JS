const fofMW = require('../middlewares/error/404MW'); 
const errorHandlerMW = require('../middlewares/error/errorHandlerMW');
const renderMW = require('../middlewares/utility/renderMW');

const CommentModel = require('../models/comment');
const SpacecraftModel = require('../models/spacecraft');
const UserModel = require('../models/user');

module.exports = function(app){
    
    const objectRepository = {
        CommentModel: CommentModel,
        SpacecraftModel: SpacecraftModel,
        UserModel: UserModel
    }

    /**
     * Error 
     */
    app.get('/error',
        errorHandlerMW(objectRepository),
        renderMW(objectRepository, 'error')
    );

    /**
     * Opening page - must be at the bottom, before error handling. This position fits
     */
    app.all('/', 
        renderMW(objectRepository, 'index')
    );

    /**
     * Handle not found content requests
     */
    app.use('*', 
        fofMW(objectRepository), 
        renderMW(objectRepository, '404')
    );

    /**
     * We gonna handle some errors boys!
     */
    app.use(function(err, req, res, next){
        res.status(500).send('Durasteel is out fo stock! Come back later.');
        console.log(err.stack);
    });
};