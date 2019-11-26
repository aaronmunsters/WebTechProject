'use strict'
const sql = require('../../../db.js');

// Token verification (expects user.id to be in the req) --> after verifyToken is called
module.exports = function (req, res, next){

    // Find the user matching the id 
    sql.query(`Select * from Users where id = ?`, req.user.id, function(err, result) {
        if(err) {
            console.log("error: ", err);
        }
        else { // Id exists
          if (result && result.length ) {
            req.user.role = result[0].role
            next()
          } else res.status(400).send('Token points to invalid user!');
        }
    })    
}