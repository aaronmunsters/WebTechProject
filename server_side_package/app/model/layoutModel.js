'use strict';
const database_functions = require('./util/sqlFunctionCreators.js')
const sql = require('../../db.js');
const uuidv1 = require('uuid/v1');

// Layout object constructor
var layout = function(layout){
    Object.keys(layout).forEach((key) => this[key] = layout[key])
    this.id = uuidv1();
};

layout.createLayout = database_functions.create_function("Layouts")
layout.getLayoutById = database_functions.accessor_id_function("Layouts")
layout.getAllLayouts = database_functions.get_all_function("Layouts")
layout.remove = database_functions.delete_by_id_function("Layouts")
layout.updateById = function (id, layout, result) {
    sql.query(`UPDATE layouts SET id = ?,
                                  columnType = ?,
                                  backgroundType = ?,
                                  backgroundColor = ?,
                                  backgroundPicture = ?,
                                  navbar = ?,
                                  navcontent = ?,
                                  footer = ?,
                                  footcontent = ? WHERE id = ?`, 
                                  [layout.id,
                                   layout.columnType,
                                   layout.backgroundType,
                                   layout.backgroundColor,
                                   layout.backgroundPicture,
                                   layout.navbar,
                                   layout.navcontent,
                                   layout.footer,
                                   layout.footcontent, 
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