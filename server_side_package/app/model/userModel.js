'use strict';
const database_functions = require('./util/sqlFunctionCreators.js')
const sql = require('../../db.js');
const jsDate_to_sqlDate = require('./util/dateConverter.js');

// User object constructor
var user = function(user){
    Object.keys(user).forEach((key) => this[key] = user[key])
    this.date = jsDate_to_sqlDate(Date.now())
    this.role = "normal"
};

user.create = database_functions.create_function("Users")
user.get    = database_functions.accessor_id_function("Users", "email")
user.getAll = database_functions.get_all_function("Users")
user.remove = database_functions.delete_by_id_function("Users", "email")
user.update = function (email, user, result) {
    sql.query(`UPDATE Users SET name = ?, email = ?, password = ?, date = ?, role = ? WHERE email = ?`, 
                                [user.name,
                                 user.email,
                                 user.password,
                                 user.date,
                                 user.role,
                                 email], function (err, res) {
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