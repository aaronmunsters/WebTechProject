'use strict'
/*
*   MIDDLEWARE: IMAGE UPLOADING
*
*   In this file the a middleware function is defined
*   that will store images inside the request in the database/image_uploads folder,
*   also a compressed&scaled version of the image will be stored in the datbase/compressed_image_uploads folder
*   
*   The compression and scaling is done by the external 'Tinify' API, 
*   ONLY if the API key is provided in the .env file under key: 'TINIFYKEY'
*   --> get a key at: https://tinypng.com/)
*
*   Added to request body:
*   - id(newly generated or passed)
*   - the file extension
*   - server filepath
*   - compressed filepath
*   - image width
*   - image height
*
*   a filter is used to make sure only image files are uploadable
*
*/
const path = require("path");
const uuidv1 = require('uuid/v1');
const tinify = require("tinify");
const sizeOf = require('image-size');
const jsonError = require('../../../util/jsonError.js');
const {createValidation, updateValidation} = require("../../validation/imageValidation.js");

  
module.exports = async function(req, res, next) {

  // Check if a file was included
  if (!req.files || Object.keys(req.files).length === 0) return jsonError(res, 400, 'No files were uploaded!');
  else {

    // Get the correct validation function
    const validationF = createValidation;
    if(req.method == 'PUT') validationF = updateValidation;

    // Validate form input
    const {error} = validationF(req.body);
    if(error) return jsonError(res, 400, error.details[0].message);
    else {

      // The name of the input field is used to retrieve the uploaded file
      const image = req.files.image;

      // Check the file extension
      if(!image.name.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG)$/)) return jsonError(res, 400, "Only image files are allowed!");

      // Use given id if it is in the request(to support overwrites)
      var id = req.params.value
      // Generate a new one if it isn't
      if(typeof id === 'undefined') id = uuidv1();
      req.body.id = id

      // Store the file extension in the request body
      const extension = path.extname(image.name)
      req.body.extension = extension

      // Store the file path in the request body
      req.body.src = '/' + process.env.VERSION + '/api/images/' + id + extension;

      // Store the compressed file path in the request body
      req.body.compressed_src = '/' + process.env.VERSION + '/api/compressed_images/' + id + extension;


      // Store the file in the image_uploads folder
      const image_path = "/usr/src/app/image_uploads/" + id + extension
      await image.mv(image_path, function(err) {
        if(err) return jsonError(res, 500, err)
        else {

          // Use the 'Tinify' module to get a compressed&scaled version of the image and store it (see header)
          const tinifyKey = process.env.TINIFYKEY
          if(typeof tinifyKey !== 'undefined'){
            tinify.key = tinifyKey;
            const source = tinify.fromFile(image_path);
            const resized = source.resize({
              method: "scale",
              height: 100
            })
            resized.toFile("/usr/src/app/compressed_image_uploads/" + id + extension);
          } else console.log("Please provide a tinify key for the compressions to work!");

          // Get the image's original width and height now that it is stored
          sizeOf(image_path, function (err, dimensions) {
            if(err) jsonError(res, 400, err)
            else {
              req.body.width = dimensions.width;
              req.body.height = dimensions.height;
              
              // Allow the chain of middlewares to continue
              next();
            }
          })
        }
      })
    }
  }
}