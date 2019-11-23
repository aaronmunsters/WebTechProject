'use strict';
const layout = require('../model/layoutModel.js');
const controller_functions = require('./util/controllerFunctionCreators.js');
const validation = require('./validation/layoutValidation');

// Export all needed functions
exports.list_all_layouts  = controller_functions.list_all_function(layout);
exports.read_a_layout     = controller_functions.get_function(layout, 'layoutId');
exports.update_a_layout   = controller_functions.update_function(layout, 'layoutId');
exports.delete_a_layout   = controller_functions.delete_function(layout, 'layoutId');
exports.create_a_layout   = controller_functions.create_function(layout, 'layoutId', "Layouts", validation);