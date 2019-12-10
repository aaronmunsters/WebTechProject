'use strict'
/*
*   ROUTE: PAGE
*
*   In this file the page route is defined, lots of middleware functions are used 
*   to get the required functionality
*
*   The last function in the chain of middlewares will always be a controller function that
*   finalizes the action
*/
const verifyToken = require("./middlewares/verifyToken.js");
const getUserInfo = require("./middlewares/getUserInfo.js");
const roleChecker = require("./middlewares/checkRole.js");
const validate = require("./middlewares/validateInput.js");
const {createValidation, updateValidation} = require('./validation/pageValidation');
const updateEditor = require('./middlewares/editorAdder.js');
const dateAdder = require('./middlewares/dateAdder.js');

// PAGE ROUTE FUNCTION
module.exports = function(app){
  const page = require("../controller/pageController");

  // Accessing and creating
  app.route('/' + process.env.VERSION + '/api/page')
    .get(verifyToken, getUserInfo, roleChecker('admin'), page.list_all_pages)
    .post(verifyToken, getUserInfo, roleChecker('admin'), validate(createValidation), updateEditor, dateAdder, page.create_a_page);

  // Specific access, updating and deleting
  app.route('/' + process.env.VERSION + '/api/page/:id')
    .get(page.read_a_page)
    .put(verifyToken, getUserInfo, roleChecker('admin'), validate(updateValidation), updateEditor, dateAdder, page.update_a_page)
    .delete(verifyToken, getUserInfo, roleChecker('admin'), page.delete_a_page);
};