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

module.exports = function(req, res, next) {

    sql.query(`Select * from Users where email = ?`, req.body.email, function(err, result) {
        if(err) {
            console.log("error: ", err);
        }
        else {
          if (result && result.length ) {
              return res.status(400).send("Email is already registered!");
          } else { 
              next()
          }
        }
    })
}