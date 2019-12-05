'use strict'
/*
*   MIDDELWARE FUNCTION
*
*   Checks if there is an actual file inside the request, complains if not
*/

module.exports = function (req, res, next){

    if (req.fileValidationError) {
        return res.send(req.fileValidationError);
    }else if (!req.file) {
        return res.send('Please select an image to upload');
    }
    next()
};
