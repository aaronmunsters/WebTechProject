'use strict'
/*
*   MIDDLEWARE: FILE CHECKER
*
*   In this file a middleware function is defined that will check if 
*   a file is provided in the request, returns corresponding errors if not
*
*/
const jsonError = require('../../../util/jsonError.js');

module.exports = function (req, res, next){

    if (req.fileValidationError) {
        return jsonError(res, 400, req.fileValidationError);
    }else if (!req.file) {
        return jsonError(res, 400, 'Please select an image to upload');
    }
    next()
};
