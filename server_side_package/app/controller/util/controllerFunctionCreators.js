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
*   Wolf De Wulf
*
*/
'use strict'
const sql = require('../../../db.js');

module.exports = {
    list_all_function   : list_all,
    get_function        : get,
    update_function     : update,
    delete_function     : del,
    create_function     : create
}

function list_all(module) {
    function lister(req, res) {
      module.getAll(function(err, mod) {
        if (err)
          res.send(err);
          console.log('res', mod);
        res.send(mod);
      });
    }
    return lister
};

function get(module) {
    function getter(req, res) {
        module.get(req.params.id, function(err, mod) {
          if (err)
            res.send(err);
          res.json(mod);
        });
    }
    return getter
}

function update(module) {
    function updator(req, res) {
        module.update(req.params.id, new module(req.body), function(err, mod) {
          if (err)
            res.send(err);
          res.json(mod);
        });
      };
      return updator
}

function del(module) {
    function deletor(req, res) {
        module.remove( req.params.id, function(err, mod) {
          if (err)
            res.send(err);
          res.json({ message: 'Entry successfully deleted!' });
        });
      };
      return deletor
}

function create(module, validationF) {
    function creator(req, res) {
       // Validate data before making new entry
       const {error} = validationF(req.body);
       if(error) return res.status(400).send(error.details[0].message);
                    
       // Create the new module and enter it
       const new_mod = new module(req.body)
        module.create(new_mod, function(err, mod) {
          if (err) res.send(err);
          res.json(new_mod.id);
        });
    };
    return creator
}
