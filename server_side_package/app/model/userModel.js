'use strict';
const database_functions = require('./util/sqlFunctionCreators.js')
const sql = require('../../db.js');
const jsDate_to_sqlDate = require('./util/dateConverter.js');
const uuidv1 = require('uuid/v1');

// User object constructor
var user = function(user){
    Object.keys(user).forEach((key) => this[key] = user[key])
    this.id = uuidv1(); 
    this.date = jsDate_to_sqlDate(Date.now())
    this.role = "normal"
};

user.create = database_functions.create_function("Users")
user.get    = database_functions.accessor_id_function("Users")
user.getAll = database_functions.get_all_function("Users")
user.remove = database_functions.delete_by_id_function("Users")
user.update = function (id, user, result) {
    sql.query(`UPDATE Users SET id = ?,
                                email = ?,
                                name = ?, 
                                password = ?, 
                                date = ?, 
                                role = ? WHERE id = ?`, 
                                [user.id,
                                 user.email,
                                 user.name,
                                 user.password,
                                 user.date,
                                 user.role,
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

module.exports= user;