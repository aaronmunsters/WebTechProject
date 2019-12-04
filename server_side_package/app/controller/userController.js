'use strict';
const user = require('../model/userModel.js');
const check_passwords = require('./util/passwordCheck.js');
const jwt = require('jsonwebtoken');
const sql = require('../../db.js');
const controller_functions = require('./util/controllerFunctionCreators.js');

// Export all needed function
exports.list_all_users  = controller_functions.list_all_function(user);
exports.read_a_user     = controller_functions.get_function(user);
exports.update_a_user   = controller_functions.update_function(user);
exports.delete_a_user   = controller_functions.delete_function(user);
exports.create_a_user   = controller_functions.create_function(user);

exports.login = function(req, res) {

  sql.query(`Select * from Users where email = ?`, req.body.email, function(err, result) {
    if(err) {
        console.log("error: ", err);
    }
    else { // Email is registered
      if (result && result.length ) {

        // Check if password is correct
        check_passwords(req.body.password, result[0].password).then(function(valid) {
          if(!valid) res.status(400).send('Email/password is wrong!');
          else {
            // Create and assign token
            console.log(result);
            const token = jwt.sign({id : result[0].id}, process.env.TOKEN_SECRET);
            res.header('auth-token', token).send(token);
          }
        })
      } else return res.status(400).send('Email/password is wrong!');
    }
  })
}