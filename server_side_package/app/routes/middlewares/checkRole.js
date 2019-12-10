'use strict'
/*
*   MIDDLEWARE: ROLE CHECKER
*
*   In this file a middleware function is defined that takes a role and returns 
*   a function that will check the role in given request to be equal to that role
*   if not it returns an access error
*
*   --> used to check the access you get for role
*  
*/
module.exports = function(neededRole) {
    function control(req, res, next){
        const requestRole = req.user.role
        if(requestRole != neededRole) {
            return res.status(401).send('You do not have the rights to do this action, role: ' + requestRole);
        } else next()
    }
    return control
}