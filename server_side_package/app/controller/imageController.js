'use strict'
/*
*   CONTROLLER: IMAGE
*
*   This file contains the controlling functions for the image module,
*   for the CRUD operations, the controllerFunctionCreators are used
*
*/
const image = require('../model/imageModel.js');
const controller_functions = require('./util/controllerFunctionCreators.js');

// Export CRUD functions
exports.list_all_images  = controller_functions.list_all_function(image);
exports.read_a_image     = controller_functions.get_function(image);
exports.update_a_image   = controller_functions.update_function(image);
exports.delete_a_image   = controller_functions.delete_function(image);
exports.create_a_image   = controller_functions.create_function(image);