'use strict'
const verifyToken = require("./middelwares/verifyToken.js")
const verifyUser = require("./middelwares/verifyUser.js")

module.exports = function(app){
  const component = require("../controller/componentController");

  // Routes
  app.route('/woxComponent')
    .get(verifyToken, component.list_all_components)
    .post(verifyToken, verifyUser, component.create_a_component);

  app.route('/woxComponent/:id')
    .get(verifyToken, component.read_a_component)
    .put(verifyToken, verifyUser, component.update_a_component)
    .delete(verifyToken, component.delete_a_component);

};