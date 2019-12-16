'use strict'
/*
*   MIDDLEWARE: IMAGE UPLOADING
*
*   In this file the a middleware function is defined
*   that will store images inside the request in the database/image_uploads folder
*
*   an id(newly generated or passed), the extension and new filepath are all stored in the request
*   for use by following middleware/handlers
*
*   a filter is used to make sure only image files are uploadable
*
*/
const path = require("path");
const uuidv1 = require('uuid/v1');
const jsonError = require('../../../util/jsonError.js');
const {createValidation, updateValidation} = require("../../validation/imageValidation.js");

  
module.exports = async function(req, res, next) {

  // Check if a file was included
  if (!req.files || Object.keys(req.files).length === 0) return jsonError(res, 400, 'No files were uploaded.');
  else {

    // Get the correct validation function
    const validationF = createValidation;
    if(req.method == 'PUT') validationF = updateValidation;

    // Validate form input
    const {error} = validationF(req.body);
    if(error) return jsonError(res, 400, error.details[0].message);
    else {

      // The name of the input field is used to retrieve the uploaded file
      let image = req.files.image;

      // Check the file extension
      if(path.extname(image.name) != ".jpg") return jsonError(res, 400, "Only images are allowed!");

      // Use given id if it is in the request(to support overwrites)
      var id = req.params.id
      // Generate a new one if it isn't
      if(typeof id === 'undefined') id = uuidv1();
      req.body.id = id

      // Store the file extension in the request body
      const extension = path.extname(image.name)
      req.body.extension = extension

      // Store the file path in the request body
      const host = req.hostname;
      req.body.filepath = req.protocol + "://" + host + ":" + process.env.PORT + '/' + process.env.VERSION + '/api/images/' + id + extension;
      console.log(req.body);

      // Store the file in the image_uploads folder
      await image.mv("/usr/src/app/image_uploads/" + id + extension, function(err) {
        if(err) return jsonError(res, 500, err)
        else next()
      });
    }
  }
}