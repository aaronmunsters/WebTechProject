'use strict'
/*
*   MIDDELWARE FUNCTION
*
*   uses username in request to set as 'editor' field in the request
*   this is needed for modules like page/component who hold their last editor
*/
module.exports = function(req, res, next){
    req.body.editor = req.user.name
    next()
}