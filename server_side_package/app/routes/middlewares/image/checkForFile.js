'use strict'
/*
*   MIDDLEWARE: FILE CHECKER
*
*   In this file a middleware function is defined that will check if 
*   a file is provided in the request, returns corresponding errors if not
*
*/

module.exports = function (req, res, next){

    if (req.fileValidationError) {
        return res.send(req.fileValidationError);
    }else if (!req.file) {
        return res.send('Please select an image to upload');
    }
    next()
};
