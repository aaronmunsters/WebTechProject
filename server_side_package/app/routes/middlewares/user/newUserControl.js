'use strict'
/*
*   MIDDLEWARE: NEW USER EMAIL CHECKER
*
*   In this file a middleware function is defined that is used before creating
*   a new user, it will check if the email provided in the request isn't already
*   registered in the database
*
*/
const sql = require('../../../../db.js');
const jsonError = require('../../../util/jsonError.js');

module.exports = function(req, res, next) {

    sql.query(`Select * from Users where email = ?`, req.body.email, function(err, result) {
        if(err) {
            return jsonError(res, 400, err)
        }
        else {
          if (result && result.length ) {
              return jsonError(res, 400, "Email is already registered!");
          } else { 
              next()
          }
        }
    })
}