'use strict'
/*
*   CONTROLLER: LAYOUT
*
*   This file contains the controlling functions for the layout module,
*   for the CRUD operations, the controllerFunctionCreators are used
*
*/
const layout = require('../model/layoutModel.js');
const controller_functions = require('./util/controllerFunctionCreators.js');

// Export CRUD functions
exports.list_all_layouts  = controller_functions.list_all_function(layout);
exports.read_a_layout     = controller_functions.get_function(layout);
exports.update_a_layout   = controller_functions.update_function(layout);
exports.delete_a_layout   = controller_functions.delete_function(layout);
exports.create_a_layout   = controller_functions.create_function(layout);