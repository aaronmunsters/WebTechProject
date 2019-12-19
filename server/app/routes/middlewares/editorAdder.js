'use strict'
/*
*   MIDDLEWARE: EDITOR ADDER
*
*   In this file a middleware function is defined that will store the name
*   of the logged in user as the editor field in the request
*
*   should be used after getUserInfo and for routes of modules that keep their 'last editor'
*  
*/
module.exports = function(req, res, next){
    req.body.editor = req.user.name
    next()
}