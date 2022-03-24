const renderMW = require('../middlewares/utility/renderMW');
const checkLoginMW = require('../middlewares/auth/checkLoginMW');
const checkRegistrationMW = require('../middlewares/auth/checkRegistrationMW');
const saveRegistrationMW = require('../middlewares/auth/saveRegistrationMW');
const logoutMW = require('../middlewares/auth/logoutMW');
const getUserByEmailMW = require('../middlewares/users/getUserByEmailMW');
const sendNewPasswordMW = require('../middlewares/auth/sendNewPasswordMW');
const userModel = {};

module.exports = function(app){
    
    const objectRepository = {
        userModel: userModel
    }

    /**
     * Login
     */
    app.post('/login', 
        checkLoginMW(objectRepository),
        renderMW(objectRepository, 'index')
    );

    /**
     * Register
     */
    app.post('/register',
        checkRegistrationMW(objectRepository),
        saveRegistrationMW(objectRepository),
        renderMW(objectRepository, 'register')
    );

    /**
     * Logout
     */
    app.get('/logout',
        logoutMW(objectRepository)
    );

    /**
     * Forgot password
     */
    app.all('/forgot',
        getUserByEmailMW(objectRepository),
        sendNewPasswordMW(objectRepository),
        renderMW(objectRepository, 'forgotpass')
    );
};