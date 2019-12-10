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
const roleChecker = require("./middlewares/checkRole.js");
const image = require("../controller/imageController");
const upload = require("./middlewares/image/imageUploads.js");
const checkForFile = require("./middlewares/image/checkForFile.js");
const imageDeletor = require("./middlewares/image/imageDeletes.js");
const validate = require("./middlewares/validateInput.js");
const {createValidation, updateValidation} = require("./validation/imageValidation.js");
const express = require('express');

// IMAGE ROUTE FUNCTION
module.exports = function(app){

    // Accessing and creating
    app.route('/' + process.env.VERSION + '/api/image')
    .get(verifyToken, getUserInfo, roleChecker('admin'), image.list_all_images)
    .post(upload, checkForFile, image.create_a_image)

    // Specific access, updating and deleting
    app.route('/' + process.env.VERSION + '/api/image/:id')
    .get(image.read_a_image)
    .put(upload, checkForFile, image.update_a_image)
    .delete(verifyToken, getUserInfo, roleChecker('admin'), imageDeletor, image.delete_a_image)

    // Make the database/image_uploads static such that images in there can be requested
    app.use('/' + process.env.VERSION + '/api/images', express.static('/usr/src/app/image_uploads/'));
};