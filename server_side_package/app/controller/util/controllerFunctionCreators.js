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
  
        console.log('controller')
        if (err)
          res.send(err);
          console.log('res', mod);
        res.send(mod);
      });
    }
    return lister
};

function get(module, key) {
    function getter(req, res) {
        module.get(req.params[key], function(err, mod) {
          if (err)
            res.send(err);
          res.json(mod);
        });
    }
    return getter
}

function update(module, key) {
    function updator(req, res) {
        module.update(req.params[key], new module(req.body), function(err, mod) {
          if (err)
            res.send(err);
          res.json(mod);
        });
      };
      return updator
}

function del(module, key) {
    function deletor(req, res) {
        module.remove( req.params[key], function(err, mod) {
          if (err)
            res.send(err);
          res.json({ message: 'Entry successfully deleted!' });
        });
      };
      return deletor
}

function create(module, key, table_name, validationF) {
    function creator(req, res) {
        
        // Check if entry doesn't already exist
        sql.query(`Select * from ${table_name} where ${key} = ?`, req.body[key], function(err, result) {
            if(err) {
                console.log("error: ", err);
            }
            else {
                if (result && result.length ) {
                    // Entry already exists
                    return res.status(400).send(key + " is already registered!");
                } else {
                    // Entry doesn't exist 
            
                    // Validate data before making new entry
                    const {error} = validationF(req.body);
                    if(error) return res.status(400).send(error.details[0].message);
                    
                    // Create the new module and enter it
                    module.create(new module(req.body), function(err, mod) {
                        if (err) res.send(err);
                        res.json(mod);
                    });
                };
            }
        })
    }
    return creator
}
