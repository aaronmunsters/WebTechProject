'user strict';
const database_functions = require('./util/sqlFunctionCreators.js')
const sql = require('../../db.js');
const jsDate_to_sqlDate = require('./util/dateConverter.js');

// Page object constructor
var page = function(page){
    this.pageId = page.pageId,
    this.title = page.title,
    this.date = jsDate_to_sqlDate(page.date),
    this.creatorName = page.creatorName,
    this.published = page.published,
    this.comps = this.comps
};

page.createPage = database_functions.create_function("Pages")
page.getPageById = database_functions.accessor_id_function("Pages", "pageId")
page.getAllPages = database_functions.get_all_function("Pages")
page.remove = database_functions.delete_by_id_function("Pages", "pageId")
page.updateById = function (id, page, result) {
    sql.query(`UPDATE Pages SET pageId = ?,
                                title = ?,
                                date = ?,
                                creatorName = ?,
                                published = ?,
                                comps = ? WHERE pageId = ?`,
                                [page.pageId,
                                 page.title,
                                 page.date,
                                 page.creatorName,
                                 page.published,
                                 page.comps,
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