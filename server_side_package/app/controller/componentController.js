'use strict';
const component = require('../model/componentModel.js');
const validation = require('./validation/componentValidation');


exports.list_all_components = function(req, res) {
  component.getAllComponents(function(err, component) {

    if (err)
      res.send(err);
      console.log('res', component);
    res.send(component);
  });
};

exports.create_a_component = function(req, res) {

  // Validate data before making new component
  const {error} = validation(req.body);
  if(error) return res.status(400).send(error.details[0].message);
  else {
        component.createComponent(new component(req.body), function(err, component) {
    if (err)
      res.send(err);
    res.json(component);
    });
   };
};

exports.read_a_component = function(req, res) {
  component.getComponentById(req.params.componentId, function(err, component) {
    if (err)
      res.send(err);
    res.json(component);
  });
};

exports.update_a_component = function(req, res) {
  component.updateById(req.params.componentId, new component(req.body), function(err, component) {
    if (err)
      res.send(err);
    res.json(component);
  });
};

exports.delete_a_component = function(req, res) {
  component.remove( req.params.componentId, function(err, component) {
    if (err)
      res.send(err);
    res.json({ message: 'Component successfully deleted!' });
  });
};