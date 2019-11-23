'use strict';
const page = require('../model/pageModel.js');
const controller_functions = require('./util/controllerFunctionCreators.js');
const validation = require('./validation/pageValidation');

// Export all needed functions
exports.list_all_pages  = controller_functions.list_all_function(page);
exports.read_a_page     = controller_functions.get_function(page, 'pageId');
exports.update_a_page   = controller_functions.update_function(page, 'pageId');
exports.delete_a_page   = controller_functions.delete_function(page, 'pageId');
exports.create_a_page   = controller_functions.create_function(page, 'pageId', "Pages", validation);