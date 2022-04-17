const renderMW = require('../middlewares/utility/renderMW');
const authMW = require('../middlewares/auth/authMW');
const getSpacecraftsMW = require('../middlewares/spacecraft/getSpacecraftsMW');
const getSpacecraftMW = require('../middlewares/spacecraft/getSpacecraftMW');
const getCommentsMW = require('../middlewares/comment/getCommentsMW');
const getCommentsToCompareMW = require('../middlewares/comment/getCommentsToCompareMW');
const checkSpacecraftOwnerMW = require('../middlewares/users/checkSpacecraftOwnerMW');
const saveSpacecraftMW = require('../middlewares/spacecraft/saveSpacecraftMW');
const deleteSpacecraftMW = require('../middlewares/spacecraft/deleteSpacecraftMW');
const getSpacecraftsToCompareMW = require('../middlewares/spacecraft/getSpacecraftsToCompareMW');
const getUsersToCompareMW = require('../middlewares/users/getUsersToCompareMW');

const path = require('path');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: './static/assets/spacecrafts/',
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({storage: storage});

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
     * List spacecrafts
     */
    app.get('/list',
        authMW(objectRepository),
        getSpacecraftsMW(objectRepository),
        renderMW(objectRepository, 'list')
    );

    /**
     * Grid spacecrafts
     */
    app.get('/grid',
        authMW(objectRepository),
        getSpacecraftsMW(objectRepository),
        renderMW(objectRepository, 'grid')
    );

    /**
     * Details view of spaceraft
     */
    app.get('/spacecraft/:spacecraftid/details',
        authMW(objectRepository),
        getSpacecraftMW(objectRepository),
        getCommentsMW(objectRepository),
        checkSpacecraftOwnerMW(objectRepository),
        renderMW(objectRepository, 'details')
    );

    /**
     * Create spacecraft - render
     */
    app.get('/spacecrafts/new',
        authMW(objectRepository),
        renderMW(objectRepository, 'addspacecraft')
    );

    /**
     * Create spacecraft - POST with data
     */
    app.post('/spacecrafts/new', 
        upload.single('spacecraftpic'),
        authMW(objectRepository),
        saveSpacecraftMW(objectRepository),
        renderMW(objectRepository, 'addspacecraft')
    );

    /**
     * Edit spacecraft
     */
    app.all('/spacecraft/:spacecraftid/edit',
        authMW(objectRepository),
        getSpacecraftMW(objectRepository),
        saveSpacecraftMW(objectRepository),
        renderMW(objectRepository, 'addspacecraft')
    );

    /**
     * Delete spacecraft
     */
    app.get('/spacecraft/:spacecraftid/delete',
        authMW(objectRepository),
        getSpacecraftMW(objectRepository),
        getCommentsMW(objectRepository),
        deleteSpacecraftMW(objectRepository)
    );

    /**
     * Compare spacecrafts
     */
    app.get('/compare/:idA/:idB',
        authMW(objectRepository),
        getSpacecraftsToCompareMW(objectRepository),
        getCommentsToCompareMW(objectRepository),
        //getUsersToCompareMW(objectRepository),
        renderMW(objectRepository, 'compare')
    );
};