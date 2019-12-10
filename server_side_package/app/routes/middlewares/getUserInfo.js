'use strict'
/*
*   MIDDLEWARE: USER ROLE/NAME FINDER
*
*   In this file a middleware function is defined that will find a user
*   by its id, which should be provided in the request, and add its name and role
*   to the request for use by following middleware functions or handlers
*/
const sql = require('../../../db.js');

module.exports = function (req, res, next){

  if('id' in req.user){

    // Find the user matching the id 
    sql.query(`Select * from Users where id = ?`, req.user.id, function(err, result) {
        if(err) {
            console.log("error: ", err);
        }
        else { // Id exists
          if (result && result.length ) {
            console.log(result[0])
            req.user.role = result[0].role
            req.user.name = result[0].name
            next()
          } else res.status(400).send('Token points to invalid user!');
        }
    })
  } else res.status(400).send('Cannot get user role/name before verifying token!');    
}