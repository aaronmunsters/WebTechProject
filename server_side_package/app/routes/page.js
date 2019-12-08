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
const validate = require("./middlewares/validateInput.js");
const validationFunction = require('./validation/pageValidation');
const updateEditor = require('./middlewares/editorAdder.js');

// PAGE ROUTE FUNCTION
module.exports = function(app){
  const page = require("../controller/pageController");

  // Accessing and creating
  app.route('/api/page')
    .get(verifyToken, page.list_all_pages)
    .post(verifyToken, getUserInfo, validate(validationFunction), updateEditor, page.create_a_page);

  // Specific access, updating and deleting
  app.route('/api/page/:id')
    .get(page.read_a_page)
    .put(verifyToken, getUserInfo, updateEditor, page.update_a_page)
    .delete(verifyToken, page.delete_a_page);
};