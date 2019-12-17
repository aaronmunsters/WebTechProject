'use strict'
/*
*   MODEL:  COMMENT
*
*   This file defines the comment object,
*   the sqlFunctionCreators are used for all CRUD operations
*
*/
const database_functions = require('./util/sqlFunctionCreators.js')

// Comment object constructor, will be passed the request body
var comment = function(comp){

    // Get all request input
    Object.keys(comp).forEach((key) => this[key] = comp[key])

    // Initialise it's reply list with the empty list
    this.replies = JSON.stringify([]);
};

comment.create = database_functions.create_function("Comments")
comment.get    = database_functions.accessor_id_function("Comments")
comment.getAll = database_functions.get_all_function("Comments")
comment.remove = database_functions.delete_by_id_function("Comments")
comment.update = database_functions.update_function("Comments")

module.exports= comment;