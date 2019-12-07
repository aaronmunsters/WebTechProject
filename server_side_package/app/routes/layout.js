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
const validate = require("./middlewares/validateInput.js");
const validationFunction = require('./validation/layoutValidation');

// LAYOUT ROUTE FUNCTION
module.exports = function(app){
  const layout = require("../controller/layoutController");

  // Accessing and creating
  app.route('/layout')
    .get(verifyToken, layout.list_all_layouts)
    .post(verifyToken, getUserInfo, validate(validationFunction), layout.create_a_layout);

  // Specific access, updating and deleting
  app.route('/layout/:id')
    .get(layout.read_a_layout)
    .put(verifyToken, layout.update_a_layout)
    .delete(verifyToken, layout.delete_a_layout);
};