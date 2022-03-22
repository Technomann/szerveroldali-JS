const renderMW = require('../middlewares/utility/renderMW');
const authMW = require('../middlewares/auth/authMW');
const getSpacecraftsMW = require('../middlewares/spacecraft/getSpacecraftsMW');
const getSpacecraftMW = require('../middlewares/spacecraft/getSpacecraftMW');
const getCommentsMW = require('../middlewares/comment/getCommentsMW');
const checkSpacecraftOwnerMW = require('../middlewares/users/checkSpacecraftOwnerMW');
const saveSpacecraftMW = require('../middlewares/spacecraft/saveSpacecraftMW');
const deleteSpacecraftMW = require('../middlewares/spacecraft/deleteSpacecraftMW');
const getSpacecraftsToCompareMW = require('../middlewares/spacecraft/getSpacecraftsToCompareMW');
const getUsersToCompareMW = require('../middlewares/users/getUsersToCompareMW');
const multer = require('multer');
const upload = multer({dest: '../static/assets/spacecrafts/'});
const userModel = {};

module.exports = function(app){

    const objectRepository = {
        userModel: userModel
    };

    /**
     * List spacecrafts
     */
    app.get('/spacecrafts/list',
        authMW(objectRepository),
        getSpacecraftsMW(objectRepository),
        renderMW(objectRepository, 'list')
    );

    /**
     * Grid spacecrafts
     */
    app.get('/spacecrafts/grid',
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
        upload.single('spacectaftpic'),
        authMW(objectRepository),
        saveSpacecraftMW(objectRepository),
        renderMW(objectRepository, 'addspacecraft')
    );

    /**
     * Edit spacecraft
     */
    app.use('spacecraft/:spacecraftid/edit',
        authMW(objectRepository),
        getSpacecraftMW(objectRepository),
        saveSpacecraftMW(objectRepository),
        renderMW(objectRepository, 'addspacecraft')
    );

    /**
     * Delete spacecraft
     */
    app.delete('/spacecraft/:spacecraftid/delete',
        authMW(objectRepository),
        getSpacecraftMW(objectRepository),
        deleteSpacecraftMW(objectRepository)
    );

    /**
     * Compare spacecrafts
     */
    app.get('/compare/:idA/:idB',
        authMW(objectRepository),
        getSpacecraftsToCompareMW(objectRepository),
        getCommentsMW(objectRepository),
        getUsersToCompareMW(objectRepository),
        renderMW(objectRepository, 'compare')
    );
};