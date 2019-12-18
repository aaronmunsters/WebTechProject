'use strict'
/*
*   NEW PAGE URL CHECKER
*
*   In this file a function is defined that is used before creating
*   a new page, it will check if the url provided in the request
*   is not registered in the database
*
*/
const sql = require('../../../db.js');
const jsonError = require('../../util/jsonError.js');

module.exports = function(req, res, cb) {

    sql.query(`Select * from Pages where url = ?`, req.body.url, function(err, result) {
        if(err) {
            return jsonError(res, 400, err)
        }
        else {
          if ((result && result.length)) {
              return jsonError(res, 422, 'Url is already taken!');
          } else return cb()
        }
    })
}