'use strict'
/*
*   CONTROLLER: COMPONENT
*
*   This file contains the controlling functions for the component module,
*   for the CRUD operations, the controllerFunctionCreators are used
*
*/
const component = require('../model/componentModel.js');
const controller_functions = require('./util/controllerFunctionCreators.js');

// Export CRUD functions
exports.list_all_components  = controller_functions.list_all_function(component);
exports.read_a_component     = controller_functions.get_function(component);
exports.update_a_component   = controller_functions.update_function(component);
exports.delete_a_component   = controller_functions.delete_function(component);
exports.create_a_component   = controller_functions.create_function(component);