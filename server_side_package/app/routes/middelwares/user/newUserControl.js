'use strict'
/*
*   MIDDELWARE FUNCTION
*
*   checks if the email of the new user we're trying to create isn't already registered
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