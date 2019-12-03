'use strict'
const multer = require('multer');
const crypto = require('crypto');
const image = require('../model/imageModel.js');
const controller_functions = require('./util/controllerFunctionCreators.js');
const validation = require('./validation/imageValidation');
const imageFilter = require('./util/imageFilters.js');
const path = require("path");

// Define storage location for images
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
      cb(null, 'database/uploaded_images/');
  },

  // By default, multer removes file extensions so let's add them back
  filename: function(req, file, cb) {
    crypto.pseudoRandomBytes(16, function(err, raw) {
      if (err) return callback(err);
    
      cb(null, raw.toString('hex') + path.extname(file.originalname));
    });
  }
});

/*
// Export all needed functions
exports.list_all_images  = controller_functions.list_all_function(image);
exports.read_a_image     = controller_functions.get_function(image);
exports.update_a_image   = controller_functions.update_function(image);
exports.delete_a_image   = controller_functions.delete_function(image);
exports.create_a_image   = controller_functions.create_function(image, validation);*/

exports.create_a_image = function(req, res){

    // Validate data before doing anything else
    //const {error} = validation(req.body);
    //if(error) return res.status(400).send(error.details[0].message);

    const upload = multer({ storage: storage, fileFilter: imageFilter }).single('image')

    upload(req, res, function(err) {
      // req.file contains information of uploaded file
      // req.body contains information of text fields, if there were any

      if (req.fileValidationError) {
          return res.send(req.fileValidationError);
      }else if (!req.file) {
          return res.send('Please select an image to upload');
      }else if (err instanceof multer.MulterError) {
          return res.send(err);
      }else if (err) {
          return res.send(err);
      }


      // Store the filename inside the request
      const host = req.hostname;
      req.body.filepath = req.protocol + "://" + host + '/' + req.file.path;

      // Now create the mysql module and enter it
      const new_image = new image(req.body)

      image.create(new_image, function(err, img) {
      if (err) res.send(err);
      res.json(img.id);
      });

      // Display uploaded image for user validation
      res.send(`You have uploaded this image: <hr/><img src="${req.file.path}" width="500">`);
  });
}