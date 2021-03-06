const renderMW = require('../middlewares/utility/renderMW');
const checkLoginMW = require('../middlewares/auth/checkLoginMW');
const checkRegistrationMW = require('../middlewares/auth/checkRegistrationMW');
const logoutMW = require('../middlewares/auth/logoutMW');
const getUserByEmailMW = require('../middlewares/users/getUserByEmailMW');
const sendNewPasswordMW = require('../middlewares/auth/sendNewPasswordMW');

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
        renderMW(objectRepository, 'index')
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