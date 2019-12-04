'use strict'
const verifyToken = require("./middelwares/verifyToken.js")
const verifyUser = require("./middelwares/verifyUser.js")
const validate = require("./middelwares/validateInput.js");
const validation = require('./validation/layoutValidation');

module.exports = function(app){
  const layout = require("../controller/layoutController");

  // Routes
  app.route('/layout')
    .get(verifyToken, layout.list_all_layouts)
    .post(verifyToken, verifyUser, validate(validation), layout.create_a_layout);

  app.route('/layout/:id')
    .get(verifyToken, layout.read_a_layout)
    .put(verifyToken, layout.update_a_layout)
    .delete(verifyToken, layout.delete_a_layout);
};