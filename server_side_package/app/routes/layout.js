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
const getUserInfo = require("./middlewares/getUserInfo.js");
const roleChecker = require("./middlewares/checkRole.js");
const validate = require("./middlewares/validateInput.js");
const {createValidation, updateValidation} = require('./validation/layoutValidation');

// LAYOUT ROUTE FUNCTION
module.exports = function(app){
  const layout = require("../controller/layoutController");

  // Accessing and creating
  app.route('/' + process.env.VERSION + '/api/layout')
    .get(verifyToken, getUserInfo, roleChecker('admin'), layout.list_all_layouts)
    .post(verifyToken, getUserInfo, roleChecker('admin'), validate(createValidation), layout.create_a_layout);

  // Specific access, updating and deleting
  app.route('/' + process.env.VERSION + '/api/layout/:id')
    .get(layout.read_a_layout)
    .put(verifyToken, getUserInfo, roleChecker('admin'), validate(updateValidation), layout.update_a_layout)
    .delete(verifyToken, getUserInfo, roleChecker('admin'), layout.delete_a_layout);
};