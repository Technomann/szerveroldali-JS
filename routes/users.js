const renderMW = require('../middlewares/utility/renderMW');
const authMW = require('../middlewares/auth/authMW');
const getUserByEmailMW = require('../middlewares/users/getUserByEmailMW');
const saveUserPicMW = require('../middlewares/users/saveUserPicMW');
const multer = require('multer');
const upload = multer({dest: './static/assets/users/'});

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