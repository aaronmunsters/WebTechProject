'use strict'
const verifyToken = require("./middelwares/verifyToken.js")
const verifyRole = require("./middelwares/verifyRole.js")

module.exports = function(app){
  const page = require("../controller/pageController");

  // Routes
  app.route('/page')
    .get(page.list_all_pages)
    .post(page.create_a_page);

  app.route('/page/:id')
    .get(page.read_a_page)
    .put(page.update_a_page)
    .delete(page.delete_a_page);
};
