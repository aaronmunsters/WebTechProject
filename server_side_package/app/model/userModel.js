'user strict';
const sql = require('../../db.js');

// User object constructor
var user = function(user){
    this.Name = user.Name
    this.Email = user.Email
    this.Role = user.Role
    this.Password = user.Password
    this.Date = user.Date
};

// Function for creating a user in db
user.createUser = function(newUser, result) {    
    sql.query("INSERT INTO Users set ?", newUser, function (err, res) {
            
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

// Function for getting a user by his/her name
user.getUserByName = function (userName, result) {
    sql.query("Select user from Users where Name = ? ", userName, function (err, res) {             
            if(err) {
                console.log("error: ", err);
                result(err, null);
            }
            else{
                result(null, res);
            }
        });   
};

// Function for getting all users
user.getAllUsers = function (result) {
    sql.query("Select * from Users", function (err, res) {

            if(err) {
                console.log("error: ", err);
                result(null, err);
            }
            else{
              console.log('Users : ', res); 
             result(null, res);
            }
        });   
};

// Function for updating a user by his/her name
user.updateByName = function(name, user, result){
    sql.query("UPDATE Users SET user = ? WHERE name = ?", [user.user, name], function (err, res) {
            if(err) {
                console.log("error: ", err);
                  result(null, err);
               }
             else{   
               result(null, res);
                  }
              }); 
  };

// Function for removing a user by his/her name
user.remove = function(name, result){
    sql.query("DELETE FROM Users WHERE Name = ?", [name], function (err, res) {

               if(err) {
                   console.log("error: ", err);
                   result(null, err);
               }
               else{
                result(null, res);
               }
           }); 
};

module.exports= user;