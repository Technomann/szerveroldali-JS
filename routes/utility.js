const helmet = require('helmet');
const bodyParser = require('body-parser');
const session = require('express-session');

module.exports = function(app){

    /**
     * Session above all
     */
    app.use(session({
        secret: 'Super Stardestroyer',
        cookie: {
            maxAge: 60000
        },
        resave: true, 
        saveUninitialized: false
    }));

    /**
     * Parse parameters in HTTP POST
     */
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        urlencoded: true
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

};