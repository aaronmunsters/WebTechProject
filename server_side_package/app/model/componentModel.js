'use strict';
const database_functions = require('./util/sqlFunctionCreators.js')
const sql = require('../../db.js');
const jsDate_to_sqlDate = require('./util/dateConverter.js');
const uuidv1 = require('uuid/v1');

// Component object constructor
var component = function(comp){
    Object.keys(comp).forEach((key) => this[key] = comp[key])
    this.id = uuidv1();
    this.date = jsDate_to_sqlDate(Date.now());
};

component.create = database_functions.create_function("Components")
component.get    = database_functions.accessor_id_function("Components")
component.getAll = database_functions.get_all_function("Components")
component.remove = database_functions.delete_by_id_function("Components")
component.update = function (id, component, result) {
    sql.query(`UPDATE Components SET id = ?,
                                     author = ?,
                                     title = ?,
                                     tags = ?,
                                     type = ?,
                                     content = ?,
                                     pages = ?,
                                     date = ? WHERE id = ?`, 
                                     [component.id,
                                     component.author,
                                     component.title,
                                     component.tags,
                                     component.type,
                                     component.content,
                                     component.pages,
                                     component.date,
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