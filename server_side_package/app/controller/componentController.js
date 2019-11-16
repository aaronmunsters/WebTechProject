'use strict';
const component = require('../model/componentModel.js');


exports.list_all_components = function(req, res) {
  component.getAllComponents(function(err, component) {

    console.log('controller')
    if (err)
      res.send(err);
      console.log('res', component);
    res.send(component);
  });
};

exports.create_a_component = function(req, res) {
  var new_component = new component(req.body);

  //handles null error 
   console.log(req.body)
   //TODO: fill in comp fields
   if(new_component.componentId){
        res.status(400).send({ error:true, message: 'Please provide all component fields!' });
   } else {
        component.createComponent(new_component, function(err, component) {
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