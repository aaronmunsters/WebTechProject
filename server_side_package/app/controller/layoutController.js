'use strict';
const layout = require('../model/layoutModel.js');
const validation = require('./validation/layoutValidation');

exports.list_all_layouts = function(req, res) {
  layout.getAllLayouts(function(err, layout) {

    console.log('controller')
    if (err)
      res.send(err);
      console.log('res', layout);
    res.send(layout);
  });
};

exports.create_a_layout = function(req, res) {

  // Validate data before making new component
  const {error} = validation(req.body);
  if(error) return res.status(400).send(error.details[0].message);
  else {
        layout.createLayout(new layout(req.body), function(err, layout) {
    if (err)
      res.send(err);
    res.json(layout);
    });
   };
};

exports.read_a_layout = function(req, res) {
  layout.getLayoutById(req.params.layoutId, function(err, layout) {
    if (err)
      res.send(err);
    res.json(layout);
  });
};

exports.update_a_layout = function(req, res) {
  layout.updateById(req.params.layoutId, new layout(req.body), function(err, layout) {
    if (err)
      res.send(err);
    res.json(layout);
  });
};

exports.delete_a_layout = function(req, res) {
  layout.remove( req.params.layoutId, function(err, layout) {
    if (err)
      res.send(err);
    res.json({ message: 'Layout successfully deleted!' });
  });
};