'use strict'
const verifyToken = require("./middelwares/verifyToken.js")
const verifyUser = require("./middelwares/verifyUser.js")
const validate = require("./middelwares/validateInput.js");
const {registerValidation, loginValidation} = require('./validation/userValidation');
const newUserControl = require("./middelwares/user/newUserControl.js");
const passwordHasher = require("./middelwares/user/passwordHasher.js");

// Register route
module.exports = function(app){
    const user = require("../controller/userController");
  
    // Routes
    app.route('/user')
      .get(verifyToken, user.list_all_users)
      .post(verifyToken, validate(registerValidation), newUserControl, passwordHasher, user.create_a_user);
  
    app.route('/user/:id')
      .get(verifyToken, user.read_a_user)
      .put(verifyToken, user.update_a_user)
      .delete(verifyToken, user.delete_a_user);

    app.route('/login')
      .post(validate(loginValidation), user.login);
};