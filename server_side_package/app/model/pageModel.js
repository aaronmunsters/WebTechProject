'user strict';
const sql = require('../../db.js');


// page object constructor
var page = function(page){
    this.pageId = page.pageId
};

// Function for creating a page in db
page.createPage = function(newpage, result) {    
    sql.query("INSERT INTO Pages set ?", newpage, function (err, res) {
            
            if(err) {
                console.log("error: ", err);
                result(err, null);
            }
            else{
                console.log(res.insertId);
                result(null, res.insertId);
            }
        });           
};

// Function for getting a page by it's id
page.getPageById = function (pageId, result) {
    sql.query("Select page from Pages where pageId = ? ", pageId, function (err, res) {             
            if(err) {
                console.log("error: ", err);
                result(err, null);
            }
            else{
                result(null, res);
            }
        });   
};

// Function for getting all pages
page.getAllPages = function (result) {
    sql.query("Select * from Pages", function (err, res) {

            if(err) {
                console.log("error: ", err);
                result(null, err);
            }
            else{
              console.log('pages : ', res); 
             result(null, res);
            }
        });   
};

// Function for updating a page by its id
page.updateById = function(id, page, result){
    sql.query("UPDATE Pages SET page = ? WHERE pageId = ?", [page.page, id], function (err, res) {
            if(err) {
                console.log("error: ", err);
                  result(null, err);
               }
             else{   
               result(null, res);
                  }
              }); 
  };

// Function for removing a page by its id
page.remove = function(id, result){
    sql.query("DELETE FROM Pages WHERE pageId = ?", [id], function (err, res) {

               if(err) {
                   console.log("error: ", err);
                   result(null, err);
               }
               else{
                result(null, res);
               }
           }); 
};

module.exports= page;