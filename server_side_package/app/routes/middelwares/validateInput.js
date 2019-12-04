'use strict'
/*
*   MIDDELWARE FUNCTION
*
*   takes a given validation-function to validate input data in the request
*   will mostly be used for creating/updating database rows 
*   --> to check if all required data is there
*/

module.exports = function(validationF) {
    function validator(req, res, next) {

    const {error} = validationF(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    else next()
    }
    return validator
}