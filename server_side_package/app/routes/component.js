'use strict'
/*
*   ROUTE: COMPONENT
*
*   In this file the component route is defined, lots of middleware functions are used 
*   to get the required functionality
*
*   The last function in the chain of middlewares will always be a controller function that
*   finalizes the action
*/
const verifyToken = require("./middlewares/verifyToken.js");
const getUserInfo = require("./middlewares/getUserInfo.js");
const validate = require("./middlewares/validateInput.js");
const validation = require('./validation/componentValidation');
const updateEditor = require('./middlewares/editorAdder.js');

// COMPONENT ROUTE FUNCTION
module.exports = function(app){
  const component = require("../controller/componentController");

  // Accessing and creating
  app.route('/api/woxComponent')
    .get(verifyToken, getUserInfo, component.list_all_components)
    .post(verifyToken, validate(validation), updateEditor, component.create_a_component);

  // Specific access, updating and deleting
  app.route('/api/woxComponent/:id')
    .get(component.read_a_component)
    .put(verifyToken, getUserInfo, updateEditor, component.update_a_component)
    .delete(verifyToken, component.delete_a_component)
};