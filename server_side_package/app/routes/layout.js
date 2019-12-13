'use strict'
/*
*   ROUTE: LAYOUT
*
*   In this file the layout route is defined, lots of middleware functions are used 
*   to get the required functionality
*
*   The last function in the chain of middlewares will always be a controller function that
*   finalizes the action
*/
const verifyToken = require("./middlewares/verifyToken.js");
const roleChecker = require("./middlewares/checkRole.js");
const validate = require("./middlewares/validateInput.js");
const {createValidation, updateValidation} = require('./validation/layoutValidation');
const updateEditor = require('./middlewares/editorAdder.js');
const dateAdder = require('../util/dateAdder.js');

// LAYOUT ROUTE FUNCTION
module.exports = function(app){
  const layout = require("../controller/layoutController");

  // Accessing and creating
  app.route('/' + process.env.VERSION + '/api/layout')
    .get(verifyToken, roleChecker('admin'), layout.list_all_layouts)
    .post(verifyToken, roleChecker('admin'), validate(createValidation), updateEditor, dateAdder, layout.create_a_layout);

  // Specific access, updating and deleting
  app.route('/' + process.env.VERSION + '/api/layout/:id')
    .get(layout.read_a_layout)
    .put(verifyToken, roleChecker('admin'), validate(updateValidation), updateEditor, dateAdder, layout.update_a_layout)
    .delete(verifyToken, roleChecker('admin'), layout.delete_a_layout);
};