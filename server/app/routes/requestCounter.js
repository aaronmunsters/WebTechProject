'use strict'
/*
*   ROUTE: REQUESTCOUNTER
*
*   In this file the simple requestcounter route is defined, the only thing this route
*   will handle is get requests on /requestcounter
*
*/
const verifyToken = require("./middlewares/verifyToken.js");
const roleChecker = require("./middlewares/checkRole.js");
const sql = require('../../db.js');

// REQUESTCOUNTER ROUTE FUNCTION
module.exports = function(app){

  app.route('/' + process.env.VERSION + '/api/requestcounter')
    .get(verifyToken, roleChecker(['admin', 'editor']), function(req, res) {

        sql.query('SELECT value FROM Config where id = "requestcounter"', function(err, result) {
            if(err) jsonError(res, 500, err);
            else res.json({ counter : result[0].value})
        })
    })
}