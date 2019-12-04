'use strict'
/*
*   MIDDELWARE FUNCTION
*
*   uses id in request to get corresponding user name and role to put in request
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
            req.user.role = result[0].role
            req.user.name = result[0].name
            next()
          } else res.status(400).send('Token points to invalid user!');
        }
    })
  } else res.status(400).send('Cannot get user role/name before verifying token!');    
}