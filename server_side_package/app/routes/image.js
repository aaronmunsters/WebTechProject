'use strict'
/*
*   ROUTE: IMAGE
*
*   In this file the image route is defined, lots of middleware functions are used 
*   to get the required functionality
*
*   The last function in the chain of middlewares will always be a controller function that
*   finalizes the action
*/
const verifyToken = require("./middlewares/verifyToken.js");
const getUserInfo = require("./middlewares/getUserInfo.js");
const image = require("../controller/imageController");
const upload = require("./middlewares/image/imageUploads.js");
const checkForFile = require("./middlewares/image/checkForFile.js");
const imageDeletor = require("./middlewares/image/imageDeletes.js");
const validate = require("./middlewares/validateInput.js");
const validationFunction = require("./validation/imageValidation.js");
const express = require('express');

// IMAGE ROUTE FUNCTION
module.exports = function(app){

    // Accessing and creating
    app.route('/image')
    .get(verifyToken, image.list_all_images)
    .post(upload.single('image'), checkForFile, validate(validationFunction), image.create_a_image)

    // Specific access, updating and deleting
    app.route('/image/:id')
    .get(image.read_a_image)
    .put(upload.single('image'), checkForFile, image.update_a_image)
    .delete(verifyToken, imageDeletor, image.delete_a_image)

    // Make the database/image_uploads static such that images in there can be requested
    app.use('/images', express.static('/usr/src/app/image_uploads/'));
};