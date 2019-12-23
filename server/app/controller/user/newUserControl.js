'use strict'
/*
*   NEW USER EMAIL CHECKER
*
*   In this file a function is defined that is used before creating
*   a new user, it will check if the email provided in the request
*   is or is not registered in the database
*
*/
const sql = require('../../../db.js');
const jsonError = require('../../util/jsonError.js');

module.exports = function(req, res, mustExist, cb) {

    sql.query(`Select * from Users where email = ?`, req.body.email, function(err, result) {
        if(err) jsonError(res, 500, err)
        else {
          if ((result && result.length)) {
              if(mustExist) cb(result)
              else jsonError(res, 422, "Email is already registered!");
          } else { 
              if(mustExist) jsonError(res, 422, "Email isn't registered!");
              else cb(result)
          }
        }
    })
}