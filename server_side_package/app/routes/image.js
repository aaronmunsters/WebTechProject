'use strict'
const verifyToken = require("./middelwares/verifyToken.js")
const verifyUser = require("./middelwares/verifyUser.js")
const image = require("../controller/imageController");
const upload = require("./middelwares/image/imageUploads.js");
const checkForFile = require("./middelwares/image/checkForFile.js");
const imageDeletor = require("./middelwares/image/imageDeletes.js");
const validate = require("./middelwares/validateInput.js");
const validation = require("./validation/imageValidation.js");
const express = require('express');

module.exports = function(app){

    app.route('/image')
    .get(verifyToken, image.list_all_images)
    .post(upload.single('image'), checkForFile, validate(validation), image.create_a_image)

    app.route('/image/:id')
    .get(verifyToken, image.read_a_image)
    .put(upload.single('image'), checkForFile, image.update_a_image)
    .delete(verifyToken, imageDeletor, image.delete_a_image)

    // Make the database/image_uploads static such that images in there can be requested
    app.use('/images', express.static('/usr/src/app/image_uploads/'));
};