const authMW = require('../middlewares/auth/authMW');
const getSpacecraftMW = require('../middlewares/spacecraft/getSpacecraftMW');
const deleteCommentMW = require('../middlewares/comment/deleteCommentMW');
const getCommentMW = require('../middlewares/comment/getCommentMW');
const saveCommentMW = require('../middlewares/comment/saveCommentMW');
const renderMW = require('../middlewares/utility/renderMW');
const userModel = {};

module.exports = function(app){
  
    const objectRepository = {
        userModel: userModel
    }
  
    /**
    * Create new comment
    */
    app.use('/comments/:spacecraftid/new', 
        authMW(objectRepository),
        saveCommentMW(objectRepository),
        renderMW(objectRepository, 'addcomment')
    );
  
    /**
     * Edit comment
     */
    app.use('/comment/:spacecraftid/:commentid/edit',
        authMW(objectRepository),
        getSpacecraftMW(objectRepository),
        getCommentMW(objectRepository),
        saveCommentMW(objectRepository),
        renderMW(objectRepository, 'addcomment') 
    );

    /**
     * Delete comment
     */
    app.delete('/comment/:spacecraftid/:commentid/delete', 
        authMW(objectRepository),
        getSpacecraftMW(objectRepository),
        getCommentMW(objectRepository),
        deleteCommentMW(objectRepository)
    );
};