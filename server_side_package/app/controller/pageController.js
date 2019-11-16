'use strict';
const page = require('../model/pageModel.js');
const validation = require('./validation/pageValidation');


exports.list_all_pages = function(req, res) {
  page.getAllPages(function(err, page) {

    console.log('controller')
    if (err)
      res.send(err);
      console.log('res', page);
    res.send(page);
  });
};

exports.create_a_page = function(req, res) {

  // Validate data before making new page
  const {error} = validation(req.body);
  if(error) return res.status(400).send(error.details[0].message);
  else {
        page.createPage(new page(req.body), function(err, page) {
    if (err)
      res.send(err);
    res.json(page);
    });
   };
};

exports.read_a_page = function(req, res) {
  page.getPageById(req.params.pageId, function(err, page) {
    if (err)
      res.send(err);
    res.json(page);
  });
};

exports.update_a_page = function(req, res) {
  page.updateById(req.params.pageId, new page(req.body), function(err, page) {
    if (err)
      res.send(err);
    res.json(page);
  });
};

exports.delete_a_page = function(req, res) {
  page.remove( req.params.pageId, function(err, page) {
    if (err)
      res.send(err);
    res.json({ message: 'Page successfully deleted!' });
  });
};