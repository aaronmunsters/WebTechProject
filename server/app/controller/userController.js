'use strict'
/*
*   CONTROLLER: USER
*
*   This file contains the controlling functions for the user module,
*   these will handle all CRUD operations
*
*   the login function has a more specific implementation
*
*/
const user = require('../model/userModel.js');
const check_passwords = require('./user/passwordCheck.js');
const jwt = require('jsonwebtoken');
const controller_functions = require('./util/controllerFunctionCreators.js');
const jsonError = require('../util/jsonError.js');
const emailChecker = require('./user/newUserControl.js');
const passwordHasher = require('./user/passwordHasher.js');
const dateAdder = require('../util/dateAdder.js');

// Export CRUD functions
exports.list_all_users  = controller_functions.list_all_function(user);
exports.read_a_user     = controller_functions.get_function(user);

// DELETING a user entry
exports.delete_a_user = function(req, res) {

  if(req.params.value == 'admin') jsonError(res, 400, "Cannot delete admin user!")
  else {
    const user_deletor = controller_functions.delete_function(user);
    user_deletor(req, res)
  }
}

// UPDATING a new user entry
exports.update_a_user = function(req, res) {

  passwordHasher(req, res, function() {

      const user_updator = controller_functions.update_function(user);
      user_updator(req, res);
  })
}

// CREATING a new user entry
exports.create_a_user = function(req, res) {

  emailChecker(req, res, false, function(result){
    passwordHasher(req, res, function(){
      dateAdder(req, res, function() {
        
        const user_creator = controller_functions.create_function(user);
        user_creator(req, res);
      })
    })
  })
}

// LOG a user in
exports.login = function(req, res) {

  emailChecker(req, res, true, function(result) {

       // Check if password is correct
       check_passwords(req.body.password, result[0].password).then(function(valid) {
        if(!valid) jsonError(res, 400, 'Password is incorrect!');
        else {
          // Create and assign token
          const token = jwt.sign({id : result[0].id, 
                                  role : result[0].role, 
                                  name : result[0].name}, 
                                 process.env.TOKEN_SECRET);
          res.header('auth-token', token).json({
            token: token,
            name: result[0].name,
            role: result[0].role
          });
        }
      })
  })
}