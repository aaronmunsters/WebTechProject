'use strict'
/*
*   MODEL:  COMPONENT
*
*   This file defines the component object,
*   the sqlFunctionCreators are used for all CRUD operations
*
*   uuid/v1 is used for generating random ids,
*   dates are converted for the MySql database
*
*/
const database_functions = require('./util/sqlFunctionCreators.js')
const uuidv1 = require('uuid/v1');

// Component object constructor, will be passed the request body
var component = function(comp){

    // Get all request input
    Object.keys(comp).forEach((key) => this[key] = comp[key])

    // Generate new id
    this.id = uuidv1();
};

component.create = database_functions.create_function("WoxComponents")
component.get    = database_functions.accessor_id_function("WoxComponents")
component.getAll = database_functions.get_all_function("WoxComponents")
component.remove = database_functions.delete_by_id_function("WoxComponents")
component.update = database_functions.update_function("WoxComponents")

module.exports= component;