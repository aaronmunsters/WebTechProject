'use strict';
const layout = require('../model/layoutModel.js');


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
  var new_layout = new layout(req.body);

  //handles null error 
   console.log(req.body)
   if(!new_layout.layoutId || !new_layout.coltype || !new_layout.backgroundColor || !new_layout.navBar){
        res.status(400).send({ error:true, message: 'Please provide all layouts fields!' });
   } else {
        layout.createLayout(new_layout, function(err, layout) {
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
    res.json({ message: 'Layout successfully deleted' });
  });
};