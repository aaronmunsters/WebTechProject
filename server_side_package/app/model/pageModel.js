'use strict'
/*
*   MODEL:  PAGE
*
*   This file defines the page object,
*   the sqlFunctionCreators are used for all CRUD operations
*
*   uuid/v1 is used for generating random ids,
*   dates are converted for the MySql database
*
*/
const database_functions = require('./util/sqlFunctionCreators.js')
const jsDate_to_sqlDate = require('./util/dateConverter.js');
const uuidv1 = require('uuid/v1');

// Page object constructor, will be passed the request body
var page = function(page){

    // Get all request input
    Object.keys(page).forEach((key) => this[key] = page[key])

    // Generate new id
    this.id = uuidv1();

    // Get current date
    this.date = jsDate_to_sqlDate(Date.now())

    this.columns = function() {return ["id", "title", "editor", "published", "compsL", "compsM", "compsR", "date", "url", "layout"]}
    this.getValues = function() {return this.columns().map(x => this[x])}
};

page.create = database_functions.create_function("Pages")
page.get    = database_functions.accessor_id_function("Pages")
page.getAll = database_functions.get_all_function("Pages", ["id", "title", "editor", "published", "date"])
page.remove = database_functions.delete_by_id_function("Pages")
page.update = database_functions.update_function("Pages")

module.exports= page;