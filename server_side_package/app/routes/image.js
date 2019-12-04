'use strict'
const image = require("../controller/imageController");
const upload = require("./middelwares/image/imageUploads.js");
const getFilepath = require("./middelwares/image/getFilepath.js");
const validate = require("./middelwares/validateInput.js");
const validation = require("./validation/imageValidation.js");

module.exports = function(app){

    app.route('/image')
    .post(upload.single('image'), getFilepath, validate(validation), image.create_a_image)
};