const fofMW = require('../middlewares/error/404MW'); 
const errorHandlerMW = require('../middlewares/error/errorHandlerMW');

module.exports = function(app){
  
    /**
     * Handle not found content requests
     */
    app.use('*', fofMW);

    /**
     * We gonna handle some errors boys!
     */
    app.use(errorHandlerMW);
};