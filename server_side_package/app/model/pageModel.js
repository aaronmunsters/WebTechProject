'use strict';
const database_functions = require('./util/sqlFunctionCreators.js')
const sql = require('../../db.js');
const jsDate_to_sqlDate = require('./util/dateConverter.js');
const uuidv1 = require('uuid/v1');

// Page object constructor
var page = function(page){
    Object.keys(page).forEach((key) => this[key] = page[key])
    this.id = uuidv1();
    this.date = jsDate_to_sqlDate(Date.now())
};

page.create = database_functions.create_function("Pages")
page.get    = database_functions.accessor_id_function("Pages")
page.getAll = database_functions.get_all_function("Pages")
page.remove = database_functions.delete_by_id_function("Pages")
page.update = function (id, page, result) {
    sql.query(`UPDATE Pages SET id = ?,
                                title = ?,
                                author = ?,
                                published = ?,
                                comps = ?,
                                date = ?,
                                url = ? WHERE id = ?`,
                                [page.id,
                                 page.title,
                                 page.author,
                                 page.published,
                                 page.comps,
                                 page.date,
                                 page.url,
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

module.exports= page;