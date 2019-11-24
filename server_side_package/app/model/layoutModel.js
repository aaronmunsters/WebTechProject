'use strict';
const database_functions = require('./util/sqlFunctionCreators.js')
const uuidv1 = require('uuid/v1');

// Layout object constructor
var layout = function(layout){
    Object.keys(layout).forEach((key) => this[key] = layout[key])
    this.id = uuidv1();
    this.columns = ["id", "columnType", "backgroundType", "backgroundColor", "backgroundPicture", "navbar", "navcontent", "footer", "footcontent"]
    this.getValues = function() {return this.columns.map(x => this[x])}
};

layout.createLayout   = database_functions.create_function("Layouts")
layout.getLayoutById  = database_functions.accessor_id_function("Layouts")
layout.getAllLayouts  = database_functions.get_all_function("Layouts")
layout.remove         = database_functions.delete_by_id_function("Layouts")
layout.update         = database_functions.update_function("Layouts")

module.exports= layout;