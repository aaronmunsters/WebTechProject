'use strict'
const verifyToken = require("./middelwares/verifyToken.js")
const verifyUser = require("./middelwares/verifyUser.js")

module.exports = function(app){
  const page = require("../controller/pageController");

  // Routes
  app.route('/page')
    .get(verifyToken, page.list_all_pages)
    .post(verifyToken, verifyUser, page.create_a_page);

  app.route('/page/:id')
    .get(verifyToken, page.read_a_page)
    .put(verifyToken, page.update_a_page)
    .delete(verifyToken, page.delete_a_page);
};