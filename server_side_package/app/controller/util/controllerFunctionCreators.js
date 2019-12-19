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
    list_all_function       : list_all,
    get_function            : get,
    get_with_field_function : get_with_field,
    update_function         : update,
    delete_function         : del,
    create_function         : create
}

function list_all(module) {
    function lister(req, res) {

      var col_filter = '*';
      var id_filter = '*';

      // Get possible filters
      if('filters' in req.query) {
        const filters = JSON.parse(req.query.filters);
        if('col_filter' in filters) col_filter = filters.col_filter;
        if('id_filter' in filters) id_filter = filters.id_filter;
      }
    
      module.getAll(col_filter, id_filter, function(err, mod) {
        if (err)jsonError(res, 400, err)
        else res.json(mod);
      });
    }
    return lister
}

function get(module) {
    function getter(req, res) {
        module.get(req.params.id, function(err, mod) {
          if (err) jsonError(res, 400, err)
          else if(mod.length != 0) res.json(mod[0]);
          else jsonError(res, 400, 'None found with id  = ' + req.params.id);
        });
    }
    return getter;
}

function get_with_field(module) {
  function getter(req, res, fieldName) {
    module.getByField(req.params[fieldName], fieldName, function(err, mod) {
      if(err) jsonError(res, 400, err)
      else if(mod.length != 0) res.json(mod[0])
      else jsonError(res, 400, 'None found with ' + fieldName + ' = ' + req.params[fieldName]);
    })
  }
  return getter;
}


function update(module) {
    function updator(req, res) {

        module.update(req.params.id, req.body, function(err, mod) {
          if (err) jsonError(res, 400, err)
          else res.json({ message : "Successfully updated the entry!"});
        });
      };
      return updator
}

function del(module) {
    function deletor(req, res) {
        module.remove( req.params.id, function(err, mod) {
          if (err) jsonError(res, 400, err)
          else res.json({ message: "Successfully deleted the entry!" });
        });
      };
      return deletor
}

function create(module) {
    function creator(req, res) {

      const new_mod = new module(req.body)

       module.create(new_mod, function(err, mod) {
          if (err) jsonError(res, 400, err)
          else res.json({ id: new_mod.id });
        });
    };
    return creator
}
