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
const validate = require("./middlewares/validateInput.js");
const {registerValidation, loginValidation} = require('./validation/userValidation');
const newUserControl = require("./middlewares/user/newUserControl.js");
const passwordHasher = require("./middlewares/user/passwordHasher.js");

// USER ROUTE FUNCTION
module.exports = function(app){
    const user = require("../controller/userController");
  
    // Accessing and creating
    app.route('/api/user')
      .get(verifyToken, user.list_all_users)
      .post(verifyToken, validate(registerValidation), newUserControl, passwordHasher, user.create_a_user);

    // Specific access, updating and deleting
    app.route('/api/user/:id')
      .get(verifyToken, user.read_a_user)
      .put(verifyToken, user.update_a_user)
      .delete(verifyToken, user.delete_a_user);

    // Login
    app.route('/login')
      .post(validate(loginValidation), user.login);
};