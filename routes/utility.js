const helmet = require('helmet');
const bodyParser = require('body-parser');
const session = require('express-session');
const authMW = require('../middlewares/auth/authMW');
const renderMW = require('../middlewares/utility/renderMW');

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
     * Session above all
     */
    app.use(session({
        secret: 'Super Stardestroyer',
        resave: true, 
        saveUninitialized: false
    }));

    /**
     * Parse parameters in HTTP POST
     */
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));

    /**
     * Helmet to hide ourselves
     */
    app.use(helmet());

    /**
     * Create .locals and .error on the res object
     */
    app.use(function(req, res, next){
        res.locals = {};
        res.locals.error = {};

        return next();
    });

    /**
     * Homepage
     */
    app.get('/homepage',
        authMW(objectRepository),
        renderMW(objectRepository, 'homepage')
    );

};