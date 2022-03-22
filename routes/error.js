const fofMW = require('../middlewares/error/404MW'); 
const errorHandlerMW = require('../middlewares/error/errorHandlerMW');
const renderMW = require('../middlewares/utility/renderMW');
const userModel = {};

module.exports = function(app){
  
    const objectRepository = {
        userModel: userModel
    };

    /**
     * Opening page - must be at the bottom, before errors. This position fits
     */
    app.use('/', 
    renderMW(objectRepository, 'index')
    );

    /**
     * Error 
     */
    app.get('/error/*',
        errorHandlerMW(objectRepository),
        renderMW(objectRepository, 'error')
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