'use strict'
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
*/
const sql = require('../../../db.js');
const stringConverter = require('./valuesToSqlConverter.js');

// Function creator object that can be imported to access the function creators
module.exports = {
    create_function         : database_create_function,
    accessor_id_function    : database_accessor,
    get_all_function        : database_get_all,
    update_function         : database_update,
    delete_by_id_function   : database_delete
};

function database_create_function(table_name) {
    function creator(module, result) {
        sql.query(`Insert INTO ${table_name} set ?`, module, function(err, res) {
            if(err) {
                result(err, null);
            }
            else{
                result(null, module.id);
            }
        });
    }
    return creator
}

function database_accessor(table_name) {
    function accessor(id, result) {
        sql.query(`Select * from ${table_name} where id = ?`, [id], function (err, res) {             
            if(err) {
                result(err, null);
            }
            else{
                result(null, res[0]);
            }
        });   
    };
    return accessor
}

function database_get_all(table_name) {
    function accessor(wanted_cols, wanted_ids, result) {

        // Get the columns to filter out
        var wanted_columns = []
        if(wanted_cols instanceof Array) wanted_columns = wanted_cols.join(", ");
        else wanted_columns = "*"

        // Get the objetcs to filter out
        var query = `SELECT ${wanted_columns} FROM ${table_name}`
        if(wanted_ids instanceof Array) query += ` WHERE id IN (${wanted_ids.map(x => "'" + x + "'").join(", ")})`;

        sql.query(query, function (err, res) {

            if(err) {
                result(null, err);
            }
            else{
             result(null, res);
            }
        });  
    }
    return accessor
}

function database_update(table_name) {
    function updator(id, module, result) {
        sql.query(`UPDATE ${table_name} SET id = ?, ${stringConverter(module)} WHERE id = ?`, 
                                         [id, id],
                                         function (err, res) {
            if(err) {
                result(null, err);
            } else{   
                result(null, res);
                  }
              }); 
    }
    return updator
}

function database_delete(table_name) {
    function deletor(id, result) {
        sql.query(`DELETE FROM ${table_name} WHERE id = ?`, [id], function (err, res) {

            if(err) {
                console.log("error: ", err);
                result(null, err);
            } else {
                result(null, res);
            }
        }); 
    }
    return deletor
}