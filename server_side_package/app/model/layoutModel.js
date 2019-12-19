'use strict'
/*
*   MODEL:  LAYOUT
*
*   This file defines the layout object,
*   the sqlFunctionCreators are used for all CRUD operations

*   uuid/v1 is used for generating random ids
*
*/
const database_functions = require('./util/sqlFunctionCreators.js')
const uuidv1 = require('uuid/v1');

// Layout object constructor, will be passed the request body
var layout = function(layout){

    // Get all request input
    Object.keys(layout).forEach((key) => this[key] = layout[key])
    
    // Generate new id
    this.id = uuidv1();

    // Initialise pages list as empty
    this.pages = JSON.stringify([]);
};

layout.create         = database_functions.create_function("Layouts")
layout.get            = database_functions.accessor_function("Layouts")
layout.getAll         = database_functions.get_all_function("Layouts") 
layout.remove         = database_functions.delete_by_id_function("Layouts")
layout.update         = database_functions.update_function("Layouts")

module.exports= layout;