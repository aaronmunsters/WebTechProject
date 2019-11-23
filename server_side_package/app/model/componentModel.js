'use strict';
const database_functions = require('./util/sqlFunctionCreators.js')
const sql = require('../../db.js');
const jsDate_to_sqlDate = require('./util/dateConverter.js');

// Component object constructor
var component = function(comp){
    Object.keys(comp).forEach((key) => this[key] = comp[key])
    this.date = jsDate_to_sqlDate(Date.now());
};

component.create = database_functions.create_function("Components")
component.get    = database_functions.accessor_id_function("Components", "componentId")
component.getAll = database_functions.get_all_function("Components")
component.remove = database_functions.delete_by_id_function("Components" , "componentId")
component.update = function (id, component, result) {
    sql.query(`UPDATE Pages SET componentId = ?,
                                author = ?,
                                date = ?,
                                content = ? WHERE componentId = ?`, 
                                [component.componentId,
                                 component.author,
                                 component.date,
                                 component.content,
                                 id], function (err, res) {
        if(err) {
            console.log("error: ", err);
              result(null, err);
           }
         else{   
           result(null, res);
              }
          }); 
}

module.exports= component;