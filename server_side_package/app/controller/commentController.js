'use strict'
/*
*   CONTROLLER: COMMENT
*
*   This file contains the controlling functions for the comment module,
*   for the CRUD operations, the controllerFunctionCreators are used
*
*/
const comment = require('../model/commentModel.js');
const controller_functions = require('./util/controllerFunctionCreators.js');
const removeFromComponent = require('./comment/removeFromComponent.js');
const addToComponent = require('./comment/addToComponent.js');
const uuidv1 = require('uuid/v1');

// Export CRUD functions
exports.list_all_comments  = controller_functions.list_all_function(comment);
exports.read_a_comment     = controller_functions.get_function(comment);
exports.update_a_comment   = controller_functions.update_function(comment);
exports.create_a_comment   = controller_functions.create_function(comment);

// DELETING a comment entry 
exports.delete_a_comment = function(req, res) {

    removeFromComponent(req, res, function(errorOccured) {
        if(!errorOccured) {
        const comment_deletor = controller_functions.delete_function(comment);
        comment_deletor(req, res);
        }
    })
}

// UPDATING a comment entry
exports.update_a_comment = function(req, res) {

    addToComponent(req, res, req.params.id, function(errorOccured) {
        if(!errorOccured) {
            const comment_updator = controller_functions.update_function(comment);
            comment_updator(req, res);
        }
    })
}

// CREATING a comment entry
exports.create_a_comment = function(req, res) {

    // Add a newly generated id (NEED THIS TO ADD TO COMPONENTS)
    req.body.id =  uuidv1();

    addToComponent(req, res, req.body.id, function(errorOccured) {
        if(!errorOccured) {
            const comment_creator = controller_functions.create_function(comment);
            comment_creator(req, res);
        }
    })
}