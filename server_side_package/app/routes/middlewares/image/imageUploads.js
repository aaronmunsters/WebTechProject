'use strict'
/*
*   MIDDLEWARE: IMAGE UPLOADING
*
*   In this file the 'multer' package is used to create an uploading middleware
*   that will store images inside the request in the database/image_uploads folder
*
*   a newly created id, the extension and new filepath are all stored in the request
*   for use by following middleware/handlers
*
*   a filter is used to make sure only image files are uploadable
*
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

      // Store the file path in the request
      const host = req.hostname;
      req.body.filepath = req.protocol + "://" + host + ":" + process.env.PORT + '/images/' + id + extension;

      cb(null, id +  extension);
    }
})
  
module.exports = multer({ storage: storage, fileFilter: imageFilter })