'use strict';
const user = require('../model/userModel.js');
const {registerValidation, loginValidation} = require('../routes/validation');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


exports.list_all_users = function(req, res) {
  user.getAllUsers(function(err, user) {

    console.log('controller')
    if (err)
      res.send(err);
      console.log('res', user);
    res.send(user);
  });
};

exports.create_a_user = async function(req, res) {

    // Validate data before making new user
    const {error} = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.Password, salt);

    var new_user = new user({
        Name:       req.body.Name,
        Email:      req.body.Email,
        Password:   hashedPassword,
        Date:       Date.now
    });

    user.createUser(new_user, function(err, user) {
    if (err)
      res.send(err);
    res.json(user);
    });
};

exports.read_a_user = function(req, res) {
  user.getUserByName(req.params.userName, function(err, user) {
    if (err)
      res.send(err);
    res.json(user);
  });
};

exports.update_a_user = function(req, res) {
  user.updateByName(req.params.userName, new user(req.body), function(err, user) {
    if (err)
      res.send(err);
    res.json(user);
  });
};

exports.delete_a_user = function(req, res) {
  user.remove( req.params.Name, function(err, user) {
    if (err)
      res.send(err);
    res.json({ message: 'User successfully deleted!' });
  });
};