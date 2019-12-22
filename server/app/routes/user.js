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
const roleChecker = require("./middlewares/checkRole.js");
const validate = require("./middlewares/validateInput.js");
const {registerValidation, loginValidation, updateValidation} = require('./validation/userValidation');

// USER ROUTE FUNCTION
module.exports = function(app){
    const user = require("../controller/userController");
  
    // Accessing and creating
    app.route('/' + process.env.VERSION + '/api/user')
      .get(verifyToken, roleChecker(['admin', 'editor']), user.list_all_users)
      .post(verifyToken, roleChecker(['admin']), validate(registerValidation), user.create_a_user);

    // Specific access, updating and deleting
    app.route('/' + process.env.VERSION + '/api/user/:value*')
      .get(verifyToken, roleChecker(['admin', 'editor']), user.read_a_user)
      .put(verifyToken, roleChecker(['admin']), validate(updateValidation), user.update_a_user)
      .delete(verifyToken, roleChecker(['admin']), user.delete_a_user);

    // Login
    app.route('/' + process.env.VERSION + '/api/login')
      .post(validate(loginValidation), user.login);
};