'use strict';
const database_functions = require('./util/sqlFunctionCreators.js')
const jsDate_to_sqlDate = require('./util/dateConverter.js');
const uuidv1 = require('uuid/v1');

// Page object constructor
var page = function(page){
    Object.keys(page).forEach((key) => this[key] = page[key])
    this.id = uuidv1();
    this.date = jsDate_to_sqlDate(Date.now())
    this.columns = function() {return ["id", "title", "editor", "published", "comps", "date", "url"]}
    this.getValues = function() {return this.columns().map(x => this[x])}
};

page.create = database_functions.create_function("Pages")
page.get    = database_functions.accessor_id_function("Pages")
page.getAll = database_functions.get_all_function("Pages", ["id", "title", "editor", "published", "date"])
page.remove = database_functions.delete_by_id_function("Pages")
page.update = database_functions.update_function("Pages")

module.exports= page;