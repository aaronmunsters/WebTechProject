'user strict';
const sql = require('../../db.js');


// Layout object constructor
var layout = function(layout){
    this.layoutId = layout.layoutId
    this.coltype = layout.coltype;
    this.backgroundColor = layout.backgroundColor;
    this.navBar = layout.navBar;
};

// Function for creating a layout in db
layout.createLayout = function(newLayout, result) {    
    sql.query("INSERT INTO layouts set ?", newLayout, function (err, res) {
            
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

// Function for getting a layout by it's id
layout.getLayoutById = function (layoutId, result) {
    sql.query("Select layout from layouts where id = ? ", layoutId, function (err, res) {             
            if(err) {
                console.log("error: ", err);
                result(err, null);
            }
            else{
                result(null, res);
            }
        });   
};

// Function for getting all layouts
layout.getAllLayouts = function (result) {
    sql.query("Select * from layouts", function (err, res) {

            if(err) {
                console.log("error: ", err);
                result(null, err);
            }
            else{
              console.log('layouts : ', res); 
             result(null, res);
            }
        });   
};

// Function for updating a layout by its id
layout.updateById = function(id, layout, result){
    sql.query("UPDATE layouts SET layout = ? WHERE id = ?", [layout.layout, id], function (err, res) {
            if(err) {
                console.log("error: ", err);
                  result(null, err);
               }
             else{   
               result(null, res);
                  }
              }); 
  };

// Function for removing a layout by its id
layout.remove = function(id, result){
    sql.query("DELETE FROM layouts WHERE id = ?", [id], function (err, res) {

               if(err) {
                   console.log("error: ", err);
                   result(null, err);
               }
               else{
                result(null, res);
               }
           }); 
};

module.exports= layout;