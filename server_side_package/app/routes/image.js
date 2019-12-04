'use strict'
const verifyToken = require("./middelwares/verifyToken.js")
const verifyUser = require("./middelwares/verifyUser.js")
const image = require("../controller/imageController");
const upload = require("./middelwares/image/imageUploads.js");
const getFilepath = require("./middelwares/image/getFilepath.js");
const imageDeletor = require("./middelwares/image/imageDeletes.js");
const validate = require("./middelwares/validateInput.js");
const validation = require("./validation/imageValidation.js");

module.exports = function(app){

    app.route('/image')
    .get(verifyToken, image.list_all_images)
    .post(upload.single('image'), getFilepath, validate(validation), image.create_a_image)

    app.route('/image/:id')
    .get(verifyToken, image.read_a_image)
    .put(upload.single('image'), getFilepath, image.update_a_image)
    .delete(verifyToken, imageDeletor, image.delete_a_image);
};