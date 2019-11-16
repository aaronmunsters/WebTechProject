'user strict';
const database_functions = require('./sqlFunctionCreators.js')
const sql = require('../../db.js');

// Page object constructor
var page = function(page){
    this.pageId = page.pageId
};

page.createPage = database_functions.create_function("Pages")
page.getPageById = database_functions.accessor_id_function("Pages", "pageId")
page.getAllPages = database_functions.get_all_function("Pages")
page.remove = database_functions.delete_by_id_function("Pages", "pageId")
page.updateById = function (id, page, result) {
    sql.query(`UPDATE Pages SET pageId = ? WHERE pageId = ?`, [page.pageId, id], function (err, res) {
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