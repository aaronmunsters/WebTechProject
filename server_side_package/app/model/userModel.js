'user strict';
const database_functions = require('./util/sqlFunctionCreators.js')
const sql = require('../../db.js');
const jsDate_to_sqlDate = require('./util/dateConverter.js');

// User object constructor
var user = function(user){
    this.name = user.name
    this.email = user.email
    this.password = user.password
    this.date = jsDate_to_sqlDate(Date.now())
    this.role = "normal"
};

user.createUser = database_functions.create_function("Users")
user.getUserByEmail = database_functions.accessor_id_function("Users", "email")
user.getAllUsers = database_functions.get_all_function("Users")
user.remove = database_functions.delete_by_id_function("Users", "email")
user.updateById = function (email, user, result) {
    sql.query(`UPDATE Users SET name = ?,
                                email = ?,
                                password = ?,
                                date = ?,
                                role = ?, WHERE email = ?`, 
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