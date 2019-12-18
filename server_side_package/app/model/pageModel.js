'use strict'
/*
*   MODEL:  PAGE
*
*   This file defines the page object,
*   the sqlFunctionCreators are used for all CRUD operations
*
*/
const database_functions = require('./util/sqlFunctionCreators.js')
const uuidv1 = require('uuid/v1');

// Page object constructor, will be passed the request body
var page = function(page){

    // Get all request input
    Object.keys(page).forEach((key) => this[key] = page[key])
};

page.create     = database_functions.create_function("Pages")
page.get        = database_functions.accessor_id_function("Pages")
page.getByField = database_functions.accessor_field_function("Pages")
page.getAll     = database_functions.get_all_function("Pages")
page.remove     = database_functions.delete_by_id_function("Pages")
page.update     = database_functions.update_function("Pages")

module.exports= page;