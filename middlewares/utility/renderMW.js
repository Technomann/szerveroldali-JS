
/**
 * RENDERS THE GIVEN VIEW AND PASSES LOCALS
 */

 module.exports = function(objectRepository, viewName){
     return function(req, res){
        return res.render(viewName, res.locals);
     };
 };