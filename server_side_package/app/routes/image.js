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
const express = require('express');
const verifyToken = require("./middlewares/verifyToken.js");
const roleChecker = require("./middlewares/checkRole.js");
const image = require("../controller/imageController");
const validateAndStore = require("./middlewares/image/imageUploads.js");
const fileUpload = require('express-fileupload');
const imageDeletor = require("./middlewares/image/imageDeletes.js");


// IMAGE ROUTE FUNCTION
module.exports = function(app){

    // Accessing and creating
    app.route('/' + process.env.VERSION + '/api/image')
    .get(verifyToken, roleChecker('admin'), image.list_all_images)
    .post(fileUpload(), validateAndStore, image.create_a_image)

    // Specific access, updating and deleting
    app.route('/' + process.env.VERSION + '/api/image/:id')
    .get(image.read_a_image)
    .put(fileUpload(), validateAndStore, image.update_a_image)
    .delete(verifyToken, roleChecker('admin'), imageDeletor, image.delete_a_image)

    // Make the database/image_uploads static such that images in there can be requested
    app.use('/' + process.env.VERSION + '/api/images', express.static('/usr/src/app/image_uploads/'));
};