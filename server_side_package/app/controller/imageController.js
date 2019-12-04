'use strict'
const image = require('../model/imageModel.js');
const controller_functions = require('./util/controllerFunctionCreators.js');

/*
// Export all needed functions
exports.list_all_images  = controller_functions.list_all_function(image);
exports.read_a_image     = controller_functions.get_function(image);
exports.update_a_image   = controller_functions.update_function(image);
exports.delete_a_image   = controller_functions.delete_function(image);*/
exports.create_a_image   = controller_functions.create_function(image);