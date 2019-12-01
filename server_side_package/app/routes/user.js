'use strict'
const verifyToken = require("./middelwares/verifyToken.js")
const verifyUser = require("./middelwares/verifyUser.js")

// Register route
module.exports = function(app){
    const user = require("../controller/userController");
  
    // Routes
    app.route('/user')
      .get(verifyToken, user.list_all_users)
      .post(verifyToken, user.create_a_user);
  
    app.route('/user/:id')
      .get(verifyToken, user.read_a_user)
      .put(verifyToken, user.update_a_user)
      .delete(verifyToken, user.delete_a_user);

    app.route('/login')
      .post(user.login);
  };