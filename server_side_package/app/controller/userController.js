'use strict';
const user = require('../model/userModel.js');
const {registerValidation, loginValidation} = require('./validation/userValidation');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sql = require('../../db.js');
const controller_functions = require('./util/controllerFunctionCreators.js');

// Export all needed function
exports.list_all_users  = controller_functions.list_all_function(user);
exports.read_a_user     = controller_functions.get_function(user, 'email');
exports.update_a_user   = controller_functions.update_function(user, 'email');
exports.delete_a_user   = controller_functions.delete_function(user, 'email');

async function hash_password(pass) {
      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPass = await bcrypt.hash(pass, salt);
      return hashedPass
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