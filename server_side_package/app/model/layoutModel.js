'use strict';
const database_functions = require('./util/sqlFunctionCreators.js')
const sql = require('../../db.js');

// Layout object constructor
var layout = function(layout){
    this.layoutId = layout.layoutId
    this.coltype = layout.coltype;
    this.backgroundColor = layout.backgroundColor;
    this.navBar = layout.navBar;
};


layout.createLayout = database_functions.create_function("Layouts")
layout.getLayoutById = database_functions.accessor_id_function("Layouts", "layoutId")
layout.getAllLayouts = database_functions.get_all_function("Layouts")
layout.remove = database_functions.delete_by_id_function("Layouts", "layoutId")
layout.updateById = function (id, layout, result) {
    sql.query(`UPDATE layouts SET layoutId = ?,
                                  coltype = ?,
                                  backgroundColor = ?,
                                  navBar = ? WHERE layoutId = ?`, 
                                  [layout.layoutId,
                                   layout.coltype,
                                   layout.backgroundColor,
                                   layout.navBar, 
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

module.exports= layout;