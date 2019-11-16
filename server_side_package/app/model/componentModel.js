'user strict';
const database_functions = require('./util/sqlFunctionCreators.js')
const sql = require('../../db.js');
const jsDate_to_sqlDate = require('./util/dateConverter.js');

// Component object constructor
var component = function(component){
    this.componentId = component.componentId,
    this.creatorName = component.creatorName,
    this.date = jsDate_to_sqlDate(components.date),
    this.content = component.content,
    this.pages = component.pages
};

component.createComponent = database_functions.create_function("Components")
component.getComponentById = database_functions.accessor_id_function("Components", "componentId")
component.getAllComponents = database_functions.get_all_function("Components")
component.remove = database_functions.delete_by_id_function("Components" , "componentId")
component.updateById = function (id, component, result) {
    sql.query(`UPDATE Pages SET componentId = ?,
                                creatorName = ?,
                                date = ?,
                                content = ? WHERE componentId = ?`, 
                                [component.componentId,
                                 component.creatorName,
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