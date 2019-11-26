'use strict';
const user = require('../model/userModel.js');
const {registerValidation, loginValidation} = require('./validation/userValidation');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sql = require('../../db.js');
const controller_functions = require('./util/controllerFunctionCreators.js');

// Export all needed function
exports.list_all_users  = controller_functions.list_all_function(user);
exports.read_a_user     = controller_functions.get_function(user);
exports.update_a_user   = controller_functions.update_function(user);
exports.delete_a_user   = controller_functions.delete_function(user);

async function hash_password(pass) {
      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPass = await bcrypt.hash(pass, salt);
      return hashedPass
}

async function check_passwords(given, stored) {
      return await bcrypt.compare(given, stored);
}

exports.create_a_user = function(req, res) {

  sql.query(`Select * from Users where email = ?`, req.body.email, function(err, result) {
    if(err) {
        console.log("error: ", err);
    }
    else {
      if (result && result.length ) {
          return res.status(400).send("Email is already registered!");
      } else {

        // Validate data before making new user
        const {error} = registerValidation(req.body);
        if(error) return res.status(400).send(error.details[0].message);
        
        // Hash the password and use it to create a new user
        hash_password(req.body.password).then(function(hashedPass) {
          var new_user = new user({
            name:       req.body.name,
            email:      req.body.email,
            password:   hashedPass,
          });

          user.create(new_user, function(err, user) {
            if (err)
              res.send(err);
            res.json(user);
          });
        })
      }
    } 
  })
}

exports.login = function(req, res) {

  sql.query(`Select * from Users where email = ?`, req.body.email, function(err, result) {
    if(err) {
        console.log("error: ", err);
    }
    else { // Email is registered
      if (result && result.length ) {
          
        // Validate data before logging in
        const {error} = loginValidation(req.body);
        if(error) return res.status(400).send(error.details[0].message);

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