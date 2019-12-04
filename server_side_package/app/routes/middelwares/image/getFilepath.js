'use strict'
/*
*   MIDDELWARE FUNCTION
*
*   Puts the filepath, if there is a file in the request, inside the request
*/

module.exports = function (req, res, next){

    if (req.fileValidationError) {
        return res.send(req.fileValidationError);
    }else if (!req.file) {
        return res.send('Please select an image to upload');
    }
  
    // Store the filepath inside the request
    const host = req.hostname;
    req.body.filepath = req.protocol + "://" + host + '/' + req.file.path;
  
    next()
};
