'use strict'
/*
*   ROUTE: COMMENT
*
*   In this file the comment route is defined, lots of middleware functions are used 
*   to get the required functionality
*
*   The last function in the chain of middlewares will always be a controller function that
*   finalizes the action
*/
const verifyToken = require("./middlewares/verifyToken.js");
const roleChecker = require("./middlewares/checkRole.js");
const validate = require("./middlewares/validateInput.js");
const {createValidation, updateValidation} = require('./validation/commentValidation');
const dateAdder = require('../util/dateAdder.js');

// COMMENT ROUTE FUNCTION
module.exports = function(app){
  const comment = require("../controller/commentController");

  // Accessing and creating
  app.route('/' + process.env.VERSION + '/api/comment')
    .get(verifyToken, roleChecker('admin'), comment.list_all_comments)
    .post(validate(createValidation), dateAdder, comment.create_a_comment);

  // Specific access, updating and deleting
  app.route('/' + process.env.VERSION + '/api/comment/:id')
    .get(comment.read_a_comment)
    .put(verifyToken, roleChecker('admin'), validate(updateValidation), dateAdder, comment.update_a_comment)
    .delete(verifyToken, roleChecker('admin'), comment.delete_a_comment)
};