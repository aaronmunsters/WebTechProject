/*
*
*   In this file functions are defined
*   that will create functions that define
*   the controllers for each module.
*
*   These will consist of all the basic
*   functionalities needed to edit the DB.
*
*   This will reduce code duplication.
*
*/
'use strict'
const jsonError = require('../../util/jsonError.js');

// Function creator object that can be imported to access the function creators
module.exports = {
    list_all_function   : list_all,
    get_function        : get,
    update_function     : update,
    delete_function     : del,
    create_function     : create
}

function list_all(module) {
    function lister(req, res) {

      console.log(req.query)
      const filters = JSON.parse(req.query.filters);

      // Get possible filters
      var col_filter = '*';
      if('col_filter' in filters) col_filter = filters.col_filter
      var id_filter =  '*';
      if('id_filter' in filters) id_filter = filters.id_filter
    
      module.getAll(col_filter, id_filter, function(err, mod) {
        if (err)
          jsonError(res, 400, err);
        res.json(mod);
      });
    }
    return lister
}

function get(module) {
    function getter(req, res) {
        module.get(req.params.id, function(err, mod) {
          if (err) jsonError(res, 400, err);
          res.json(mod);
        });
    }
    return getter
}


function update(module) {
    function updator(req, res) {

      console.log(req.body)
      
        module.update(req.params.id, req.body, function(err, mod) {
          if (err) jsonError(res, 400, err);
          res.json(mod);
        });
      };
      return updator
}

function del(module) {
    function deletor(req, res) {
        module.remove( req.params.id, function(err, mod) {
          if (err) jsonError(res, 400, err);
          res.json({ message: 'Entry successfully deleted!' });
        });
      };
      return deletor
}

function create(module) {
    function creator(req, res) {

      const new_mod = new module(req.body)

       module.create(new_mod, function(err, mod) {
          if (err) jsonError(res, 400, err);
          res.json(new_mod.id);
        });
    };
    return creator
}
