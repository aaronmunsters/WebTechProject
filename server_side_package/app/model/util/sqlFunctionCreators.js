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

function execute_query(query, input, result_function) {
    sql.query(query, input, function(err, res) {
        if(err) result_function(err, null)
        else result_function(null, res)
    })
}

function database_create_function(table_name) {
    function creator(module, result) {

        const query = "INSERT INTO ?? SET ?";
        const input = [table_name, module];
        execute_query(query, input, result);
    }
    return creator
}

function database_accessor(table_name) {
    function accessor(id, result) {

        const query = "SELECT * FROM ?? WHERE Id = ?";
        const input = [table_name, id];
        execute_query(query, input, result);   
    };
    return accessor
}

function database_get_all(table_name) {
    function accessor(wanted_cols, wanted_ids, result) {

        // Get the columns to filter out
        var wanted_columns = "*"
        if(wanted_cols instanceof Array) wanted_columns = wanted_cols;

        // Get the objetcs to filter out
        var query = "SELECT ?? FROM ??";
        var input = [wanted_columns, table_name]

        if(wanted_ids instanceof Array) {
            query += " WHERE id IN ?"
            input.push(wanted_ids);
        }
        execute_query(query, input, result);
    }
    return accessor
}

function database_update(table_name) {
    function updator(id, module, result) {
        
        const query = "UPDATE ?? SET ? WHERE id = ?";
        const input = [table_name, module, id];
        execute_query(query, input, result);
    }
    return updator
}

function database_delete(table_name) {
    function deletor(id, result) {

        const query = "DELETE FROM ?? WHERE id = ?";
        const input = [table_name, id];
        execute_query(query, input, result);
    }
    return deletor
}