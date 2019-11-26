'use strict'
const verifyToken = require("./middelwares/verifyToken.js")
const verifyRole = require("./middelwares/verifyRole.js")

module.exports = function(app){
  const component = require("../controller/componentController");

  // Routes
  app.route('/component')
    .get(component.list_all_components)
    .post(component.create_a_component);

  app.route('/component/:id')
    .get(component.read_a_component)
    .put(component.update_a_component)
    .delete(component.delete_a_component);

};