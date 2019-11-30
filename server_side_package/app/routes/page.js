'use strict'
const verifyToken = require("./middelwares/verifyToken.js")
const verifyRole = require("./middelwares/verifyRole.js")

module.exports = function(app){
  const page = require("../controller/pageController");

  // Routes
  app.route('/page')
    .get(verifyToken, page.list_all_pages)
    .post(verifyToken, page.create_a_page);

  app.route('/page/:id')
    .get(verifyToken, page.read_a_page)
    .put(verifyToken, page.update_a_page)
    .delete(verifyToken, page.delete_a_page);
};
