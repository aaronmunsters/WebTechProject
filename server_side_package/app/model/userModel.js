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
const jsDate_to_sqlDate = require('./util/dateConverter.js');
const uuidv1 = require('uuid/v1');

// User object constructor, will be passed the request body
var user = function(user){

    // Get all request input
    Object.keys(user).forEach((key) => this[key] = user[key])

    // Generate new id
    this.id = uuidv1(); 

    // Get current date
    this.date = jsDate_to_sqlDate(Date.now())

    this.role = "normal"
    this.columns = function() {return ["id", "email", "name", "password", "date", "role"]}
    this.getValues = function() {return this.columns().map(x => this[x])}
};

user.create = database_functions.create_function("Users")
user.get    = database_functions.accessor_id_function("Users")
user.getAll = database_functions.get_all_function("Users", ["id", "name", "email", "role", "date"])
user.remove = database_functions.delete_by_id_function("Users")
user.update = database_functions.update_function("Users")

module.exports= user;