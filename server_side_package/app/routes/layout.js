'use strict'

module.exports = function(app){
  const layout = require("../controller/layoutController");

  // Routes
  app.route('/layout')
    .get(layout.list_all_layouts)
    .post(layout.create_a_layout);

  app.route('/layout/:layoutId')
    .get(layout.read_a_layout)
    .put(layout.update_a_layout)
    .delete(layout.delete_a_layout);
};