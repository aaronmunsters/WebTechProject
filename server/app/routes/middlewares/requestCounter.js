'use strict'
/*
*   MIDDLEWARE: REQUEST COUNTER
*
*   In this file a middleware function is defined that will
*   increase the request counter by one and save it to database
*
*   should be placed as first middleware function for PAGE GET REQUESTS 
$   it only counts visitor requests, so it checks if a token is present inside the header
*  
*/
const sql = require('../../../db.js');
const jsonError = require('../../util/jsonError.js');

module.exports = function(req, res, next){

    // Check if a token is in the header
    const token = req.header('auth-token');

    // Only count visitor requests
    if(!token) {
        sql.query('SELECT value FROM Config WHERE id = "requestcounter"', function(err, result) {
            if(err) jsonError(res, 500, err);
            else {
                const newcounter = JSON.parse(result[0].value) + 1;
    
                sql.query('UPDATE Config SET value = ? WHERE id = "requestcounter"', [JSON.stringify(newcounter)], function(err, result) {
                    if(err) jsonError(res, 500, err);
                    else next()
                })
            }
        })
    } else next()
} 