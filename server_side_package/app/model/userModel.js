'user strict';
const database_functions = require('./sqlFunctionCreators.js')
const sql = require('../../db.js');

// User object constructor
var user = function(user){
    this.Name = user.Name
    this.Email = user.Email
    this.Password = user.Password
    this.Date = user.Date
};

user.createUser = database_functions.create_function("Users")
user.getUserById = database_functions.accessor_id_function("Users", "Name")
user.getAllUsers = database_functions.get_all_function("Users")
user.remove = database_functions.delete_by_id_function("Users", "Email")
user.updateById = function (id, user, result) {
    sql.query(`UPDATE Users SET Name = ?,
                                Email = ?,
                                Password = ?,
                                Date = ?, WHERE PageId = ?`, 
                                [user.Name,
                                 user.Email,
                                 user.Password,
                                 Date.now], function (err, res) {
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