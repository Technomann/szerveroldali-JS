const renderMW = require('../middlewares/utility/renderMW');
const authMW = require('../middlewares/auth/authMW');
const getUserByEmailMW = require('../middlewares/users/getUserByEmailMW');
const saveUserPicMW = require('../middlewares/users/saveUserPicMW');
const multer = require('multer');
const upload = multer({dest: './static/assets/users/'});
const userModel = {};

module.exports = function(app){

    const objectRepository = {
        userModel: userModel
    };

    /**
     * Saves users picture
     */
    app.post('/users/:userid/addpic',
        upload.single('profpic'), 
        authMW(objectRepository),
        getUserByEmailMW(objectRepository),
        saveUserPicMW(objectRepository)
    );

    /**
     * Get picture upload ejs
     */
    app.get('/users/:userid/addpic',
        authMW(objectRepository),
        renderMW(objectRepository, 'adduserpic')
    );

}