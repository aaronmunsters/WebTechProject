'use strict'
/*
*   MIDDLEWARE: REQUEST COUNTER
*
*   In this file a middleware function is defined that will
*   increase the request counter by one and save it to database
*
*   should be placed as first middleware function for ALL routes
*  
*/
const sql = require('../../../db.js');

module.exports = function(req, res, next){

    sql.query('SELECT value FROM Config where id = requestcounter', function(err, result) {
        if(err) jsonError(res, 500, err);
        else {
            const newcounter = JSON.parse(result[0].value) + 1;

            sql.query('UPDATE value = ? FROM Config where id = requestcounter', JSON.stringify(newcounter), function(err, result) {
                if(err) jsonError(res, 500, "Couldn't update request counter.");
                else next()
            })
        }
    })
}