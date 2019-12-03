'use strict'

module.exports = function(app){
  const image = require("../controller/imageController");

    app.route('/image')
    .post(image.create_a_image)
};