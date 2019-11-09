'use strict';
const page = require('../model/pageModel.js');


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
  var new_page = new page(req.body);

  //handles null error 
   console.log(req.body)
   if(!new_page.pageId){
        res.status(400).send({ error:true, message: 'Please provide all page fields!' });
   } else {
        page.createPage(new_page, function(err, page) {
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
    res.json({ message: 'Page successfully deleted' });
  });
};