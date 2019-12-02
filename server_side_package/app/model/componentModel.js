'use strict';
const database_functions = require('./util/sqlFunctionCreators.js')
const jsDate_to_sqlDate = require('./util/dateConverter.js');
const uuidv1 = require('uuid/v1');

// Component object constructor
var component = function(comp){
    Object.keys(comp).forEach((key) => this[key] = comp[key])
    this.id = uuidv1();
    this.date = jsDate_to_sqlDate(Date.now());
    this.editor = ""
    this.columns = function() {return ["id", "editor", "title", "tags", "type", "content", "pages", "date"]}
    this.getValues = function() {return this.columns().map(x => this[x])}
};

component.create = database_functions.create_function("WoxComponents")
component.get    = database_functions.accessor_id_function("WoxComponents")
component.getAll = database_functions.get_all_function("WoxComponents", ["id", "title", "editor", "pages", "date"])
component.remove = database_functions.delete_by_id_function("WoxComponents")
component.update = database_functions.update_function("WoxComponents")

module.exports= component;