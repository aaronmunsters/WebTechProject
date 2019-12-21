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
const urlChecker = require('./page/newPageControl.js');
const editComponents = require('./page/editComponents.js');
const addToComponents = require('./page/addToComponents.js');
const removeFromComponents = require('./page/removeFromComponents.js');
const addToLayout = require('./page/addToLayout.js');
const removeFromLayout = require('./page/removeFromLayout.js');
const removeSlashes = require('./page/removeSlashes.js');
const uuidv1 = require('uuid/v1');

// Export CRUD functions
exports.list_all_pages      = controller_functions.list_all_function(page);
module.exports.read_a_page  = controller_functions.get_function(page);

// REMOVING a page entry
exports.delete_a_page = function(req, res) {

    // The default page can never be removed
    if(req.params.value != "Default"){
        removeFromComponents(req, res, req.params.value, function() {
            removeFromLayout(req, res, req.params.value, function() {
                const page_deletor = controller_functions.delete_function(page);
                page_deletor(req, res);
            })
        })
    } else res.json({ message: "Cannot delete default page!"})
}

// UPDATING a page entry
exports.update_a_page = function(req, res) {

    // The default page url can never be changed
    if(req.params.value == "Default") req.body.url = "default"

    // Remove slashes from url
    removeSlashes(req);
    
    editComponents(req, res, req.params.value, function() {
        addToComponents(req, res, req.params.value, function() {
            addToLayout(req, res, req.params.value, function() {
            const page_updator = controller_functions.update_function(page);
            page_updator(req, res);
            })
        })
    })
}


// CREATING a page entry 
exports.create_a_page = function(req, res) {

    // Check if the given url isn't taken
    urlChecker(req, res, function() {

        // Add a newly generated id (NEED THIS TO ADD TO COMPONENTS)
        req.body.id =  uuidv1();

        addToComponents(req, res, req.body.id, function() {
            addToLayout(req, res, req.body.id, function() {
                const page_creator = controller_functions.create_function(page);
                page_creator(req, res);
            })
        })
    })
}