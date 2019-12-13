'use strict'
/*
*   CONTROLLER: PAGE
*
*   This file contains the controlling functions for the page module,
*   for the CRUD operations, the controllerFunctionCreators are used
*
*/
const page = require('../model/pageModel.js');
const controller_functions = require('./util/controllerFunctionCreators.js');
const addToComponents = require('./page/addToComponents.js');
const removeFromComponents = require('./page/removeFromComponents.js');
const uuidv1 = require('uuid/v1');

// Export CRUD functions
exports.list_all_pages  = controller_functions.list_all_function(page);
exports.read_a_page     = controller_functions.get_function(page);

// REMOVING a page entry
exports.delete_a_page = function(req, res) {

    removeFromComponents(req, res, req.params.id, function(errorOccured) {
        if(!errorOccured) {
            const page_deletor = controller_functions.delete_function(page);
            page_deletor(req, res);
        }
    })
}

// UPDATING a page entry
exports.update_a_page = function(req, res) {

    // HERE THE PARAMS.ID IS PASSED INSTEAD OF A NEW ONE
    addToComponents(req, res, req.params.id, function(errorOccured) {
        if(!errorOccured) {
            const page_updator = controller_functions.update_function(page);
            page_updator(req, res);
        }
    })
}

// CREATING a page entry 
exports.create_a_page = function(req, res) {
    
    // Add a newl generated id (NEED THIS TO ADD TO COMPONENTS)
    req.body.id =  uuidv1();

    addToComponents(req, res, req.body.id, function(errorOccured) {
        if(!errorOccured) {
        const page_creator = controller_functions.create_function(page);
        page_creator(req, res);
        }
    })
}