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
const remove_from_pages = require('./component/removeFromPages.js');

// Export CRUD functions
exports.list_all_components  = controller_functions.list_all_function(component);
exports.read_a_component     = controller_functions.get_function(component);
exports.update_a_component   = controller_functions.update_function(component);
exports.create_a_component   = controller_functions.create_function(component);

// DELETING a component entry 
exports.delete_a_component = function(req, res) {

    remove_from_pages(req, res, function(errorOccured) {
        if(!errorOccured) {
        const component_deletor = controller_functions.delete_function(component);
        component_deletor(req, res);
        }
    })
}