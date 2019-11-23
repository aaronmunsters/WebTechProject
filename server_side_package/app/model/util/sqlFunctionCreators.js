/*
*
*   In this file functions are defined
*   that will create functions that work 
*   on the MySql database.
*
*   These will consist of all the basic
*   functionalities needed to edit the DB.
*
*   This will reduce code duplication.
*
*   Wolf De Wulf
*
*/
'use strict';
const sql = require('../../../db.js');

module.exports = {
    create_function         : database_create_function,
    accessor_id_function    : database_accessor,
    get_all_function        : database_get_all,
    delete_by_id_function   : database_delete
};

function database_create_function(table_name) {
    function creator(newEntry, result) {
        sql.query(`Insert INTO ${table_name} set ?`, newEntry, function(err, res) {
            if(err) {
                console.log("error: ", err);
                result(err, null);
            }
            else{
                console.log(res.insertId);
                result(null, res.insertId);
            }
        
        });
    }
    return creator
}

function database_accessor(table_name, id_field) {
    function accessor(id, result) {
        sql.query(`Select * from ${table_name} where ${id_field} = ?`, [id], function (err, res) {             
            if(err) {
                console.log("error: ", err);
                result(err, null);
            }
            else{
                result(null, res);
            }
        });   
    };
    return accessor
}

function database_get_all(table_name) {
    function accessor(result) {
        sql.query(`Select * from ${table_name}`, function (err, res) {

            if(err) {
                console.log("error: ", err);
                result(null, err);
            }
            else{
              console.log('entries : ', res); 
             result(null, res);
            }
        });  
    }
    return accessor
}

function database_delete(table_name, id_field) {
    function deletor(id, result) {
        sql.query(`DELETE FROM ${table_name} WHERE ${id_field} = ?`, [id], function (err, res) {

            if(err) {
                console.log("error: ", err);
                result(null, err);
            }
            else{
             result(null, res);
            }
        }); 
    }
    return deletor
}