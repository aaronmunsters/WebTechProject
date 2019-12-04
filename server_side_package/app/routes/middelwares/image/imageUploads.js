'use strict'
/*
*   MIDDELWARE FUNCTION
*
*   uses multer to get an image file from the request and store it
*/
const multer = require('multer');
const crypto = require('crypto');
const path = require("path");

// Function that filters out image file extensions
function imageFilter(req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};

// Define storage location for images
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, '/usr/src/app/image_uploads/');
    },
  
    // By default, multer removes file extensions so let's add them back
    filename: function(req, file, cb) {
      crypto.pseudoRandomBytes(16, function(err, raw) {
        if (err) return cb(err);
      
        cb(null, raw.toString('hex') + path.extname(file.originalname));
      });
    }
})
  
module.exports = multer({ storage: storage, fileFilter: imageFilter })