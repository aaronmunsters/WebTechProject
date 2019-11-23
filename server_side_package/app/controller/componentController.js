'use strict';
const component = require('../model/componentModel.js');
const controller_functions = require('./util/controllerFunctionCreators.js');
const validation = require('./validation/componentValidation');

// Export all needed functions
exports.list_all_components  = controller_functions.list_all_function(component);
exports.read_a_component     = controller_functions.get_function(component);
exports.update_a_component   = controller_functions.update_function(component);
exports.delete_a_component   = controller_functions.delete_function(component);
exports.create_a_component   = controller_functions.create_function(component, validation);