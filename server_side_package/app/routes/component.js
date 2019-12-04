'use strict'
const verifyToken = require("./middelwares/verifyToken.js")
const verifyUser = require("./middelwares/verifyUser.js")
const validate = require("./middelwares/validateInput.js");
const validation = require('./validation/componentValidation');
const updateEditor = require('./middelwares/editorAdder.js');

module.exports = function(app){
  const component = require("../controller/componentController");

  // Routes
  app.route('/woxComponent')
    .get(verifyToken, component.list_all_components)
    .post(verifyToken, verifyUser, validate(validation), updateEditor, component.create_a_component);

  app.route('/woxComponent/:id')
    .get(verifyToken, component.read_a_component)
    .put(verifyToken, verifyUser, updateEditor, component.update_a_component)
    .delete(verifyToken, component.delete_a_component);

};