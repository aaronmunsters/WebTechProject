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
const requestCounter = require('./middlewares/requestCounter.js');
const verifyToken = require("./middlewares/verifyToken.js");
const roleChecker = require("./middlewares/checkRole.js");
const validate = require("./middlewares/validateInput.js");
const {createValidation, updateValidation} = require('./validation/componentValidation');
const updateEditor = require('./middlewares/editorAdder.js');
const dateAdder = require('../util/dateAdder.js');

// COMPONENT ROUTE FUNCTION
module.exports = function(app){
  const component = require("../controller/componentController");

  // Accessing and creating
  app.route('/' + process.env.VERSION + '/api/woxComponent')
    .get(verifyToken, roleChecker('admin'), component.list_all_components)
    .post(verifyToken, roleChecker('admin'), validate(createValidation), updateEditor, dateAdder, component.create_a_component);

  // Specific access, updating and deleting
  app.route('/' + process.env.VERSION + '/api/woxComponent/:value*')
    .get(component.read_a_component)
    .put(verifyToken, roleChecker('admin'), validate(updateValidation), updateEditor, dateAdder, component.update_a_component)
    .delete(verifyToken, roleChecker('admin'), component.delete_a_component)
};