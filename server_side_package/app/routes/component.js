'use strict'
const verifyToken = require("./middelwares/verifyToken.js")
const verifyRole = require("./middelwares/verifyRole.js")

module.exports = function(app){
  const component = require("../controller/componentController");

  // Routes
  app.route('/woxComponent')
    .get(verifyToken, component.list_all_components)
    .post(verifyToken, component.create_a_component);

  app.route('/woxComponent/:id')
    .get(verifyToken, component.read_a_component)
    .put(verifyToken, component.update_a_component)
    .delete(verifyToken, component.delete_a_component);

};