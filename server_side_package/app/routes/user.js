'use strict'
/*
*   ROUTE: USER
*
*   In this file the user route is defined, lots of middleware functions are used 
*   to get the required functionality
*
*   The last function in the chain of middlewares will always be a controller function that
*   finalizes the action
*/
const verifyToken = require("./middlewares/verifyToken.js");
const getUserInfo = require("./middlewares/getUserInfo.js");
const roleChecker = require("./middlewares/checkRole.js");
const validate = require("./middlewares/validateInput.js");
const {registerValidation, loginValidation, updateValidation} = require('./validation/userValidation');
const newUserControl = require("./middlewares/user/newUserControl.js");
const passwordHasher = require("./middlewares/user/passwordHasher.js");
const dateAdder = require('./middlewares/dateAdder.js');

// USER ROUTE FUNCTION
module.exports = function(app){
    const user = require("../controller/userController");
  
    // Accessing and creating
    app.route('/' + process.env.VERSION + '/api/user')
      .get(verifyToken, getUserInfo, roleChecker('admin'), user.list_all_users)
      .post(verifyToken, getUserInfo, roleChecker('admin'), validate(registerValidation), newUserControl, dateAdder, passwordHasher, user.create_a_user);

    // Specific access, updating and deleting
    app.route('/' + process.env.VERSION + '/api/user/:id')
      .get(verifyToken, getUserInfo, roleChecker('admin'), user.read_a_user)
      .put(verifyToken, getUserInfo, roleChecker('admin'), validate(updateValidation), passwordHasher, user.update_a_user)
      .delete(verifyToken, getUserInfo, roleChecker('admin'), user.delete_a_user);

    // Login
    app.route('/' + process.env.VERSION + '/api/login')
      .post(validate(loginValidation), user.login);
};