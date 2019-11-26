'use strict'
const verifyToken = require("./middelwares/verifyToken.js")
const verifyRole = require("./middelwares/verifyRole.js")

// Register route
module.exports = function(app){
    const user = require("../controller/userController");
  
    // Routes
    app.route('/user')
      .get(user.list_all_users)
      .post(user.create_a_user);
  
    app.route('/user/:id')
      .get(user.read_a_user)
      .put(user.update_a_user)
      .delete(user.delete_a_user);

    app.route('/login')
      .post(user.login);
  };