'use strict'
/*
*   MIDDELWARE FUNCTION
*
*   uses multer to get an image file from the request and store it
*/
const multer = require('multer');
const path = require("path");
const uuidv1 = require('uuid/v1'); 

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

      // Use given id if it is in the request(to supprt overwrites)
      var id = 0
      if('id' in req.params){
        id = req.params.id
      } else {
        id = uuidv1();
      }
      req.body.id = id

      // Store the file extension in the request
      const extension = path.extname(file.originalname)
      req.body.extension = extension

      cb(null, id +  extension);
    }
})
  
module.exports = multer({ storage: storage, fileFilter: imageFilter })