const renderMW = require('../middlewares/utility/renderMW');
const authMW = require('../middlewares/auth/authMW');
const getUserByEmailMW = require('../middlewares/users/getUserByEmailMW');
const saveUserPicMW = require('../middlewares/users/saveUserPicMW');

const path = require('path');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: './static/assets/users/',
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({storage: storage});

const CommentModel = require('../models/comment');
const SpacecraftModel = require('../models/spacecraft');
const UserModel = require('../models/user');
/*const { path } = require('express/lib/application');*/

module.exports = function(app){
    
    const objectRepository = {
        CommentModel: CommentModel,
        SpacecraftModel: SpacecraftModel,
        UserModel: UserModel
    }

    /**
     * Get picture upload ejs
     */
    app.get('/users/:userid/addpic',
        authMW(objectRepository),
        renderMW(objectRepository, 'adduserpic')
    );

    /**
     * Saves users picture
     */
    app.post('/users/:userid/addpic',
        upload.single('profpic'),
        authMW(objectRepository),
          //TRY LIKE THAT
        getUserByEmailMW(objectRepository),
        saveUserPicMW(objectRepository)
    );
}