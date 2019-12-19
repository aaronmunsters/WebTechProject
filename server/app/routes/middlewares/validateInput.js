'use strict'
/*
*   MIDDLEWARE: VALIDATION CHECKER
*
*   In this file a middleware function is defined that takes a given validation-function 
*   to validate input data in the request and returns a middleware function that uses
*   this validation-function
*
*   will mostly be used for creating/updating database rows 
*   --> to check if all required data is there
*/
const jsonError = module.require('../../util/jsonError.js');

module.exports = function(validationF) {
    function validator(req, res, next) {

    const {error} = validationF(req.body);
    if(error) return jsonError(res, 422, error.details[0].message);
    else next()
    }
    return validator
}