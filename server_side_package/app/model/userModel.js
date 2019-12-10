'use strict'
/*
*   MODEL:  USER
*
*   This file defines the user object,
*   the sqlFunctionCreators are used for all CRUD operations
*
*   uuid/v1 is used for generating random ids,
*   dates are converted for the MySql database
*
*/
const database_functions = require('./util/sqlFunctionCreators.js')
const uuidv1 = require('uuid/v1');

// User object constructor, will be passed the request body
var user = function(user){

    // Get all request input
    Object.keys(user).forEach((key) => this[key] = user[key])

    // Generate new id
    this.id = uuidv1(); 
};

user.create = database_functions.create_function("Users")
user.get    = database_functions.accessor_id_function("Users")
user.getAll = database_functions.get_all_function("Users", ["id", "name", "email", "role", "date"])
user.remove = database_functions.delete_by_id_function("Users")
user.update = database_functions.update_function("Users")

module.exports= user;