'use strict'
/*
*   CONTROLLER: USER
*
*   This file contains the controlling functions for the user module,
*   for the CRUD operations, the controllerFunctionCreators are used
*
*   the login function has a more specific implementation
*
*/
const user = require('../model/userModel.js');
const check_passwords = require('./util/passwordCheck.js');
const jwt = require('jsonwebtoken');
const sql = require('../../db.js');
const controller_functions = require('./util/controllerFunctionCreators.js');
const jsonError = require('../util/jsonError.js');

// Export CRUD functions
exports.list_all_users  = controller_functions.list_all_function(user);
exports.read_a_user     = controller_functions.get_function(user);
exports.update_a_user   = controller_functions.update_function(user);
exports.delete_a_user   = controller_functions.delete_function(user);
exports.create_a_user   = controller_functions.create_function(user);

exports.login = function(req, res) {

  // Check if the email that tries to log in is registered
  sql.query(`Select * from Users where email = ?`, req.body.email, function(err, result) {
    if(err) {
      jsonError(res, 400, err);
    }
    else { // Email is registered
      if (result && result.length ) {

        // Check if password is correct
        check_passwords(req.body.password, result[0].password).then(function(valid) {
          if(!valid) jsonError(res, 400, 'Email/password is wrong!');
          else {
            // Create and assign token
            const token = jwt.sign({id : result[0].id}, process.env.TOKEN_SECRET);
            res.header('auth-token', token).json({
              token: token
            });
          }
        })
      } else return jsonError(res, 400, 'Email/password is wrong!');
    }
  })
}