
/**
 * If the user is authenticated calls next, otherwise redirets to /
 */
const reuireOption = require('../utility/requireOption');

module.exports = function(objectRepository){
    return function(req, res, next){
        next();
    };
};