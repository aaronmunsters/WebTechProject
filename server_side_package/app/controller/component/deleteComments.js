'use strict'
/*
*   COMPONENT REMOVAL: DELETE COMMENTS
*
*   In this file a function is defined that will be called when a component is removed
*   it will delete all the comments on the component from the database
*
*/
const sql = require('../../../db.js');
const jsonError = require('../../util/jsonError.js');

module.exports = function(req, res, cb) {

    var errorOccured = false;

    sql.query('SELECT comments FROM WoxComponents WHERE id = ?', req.params.id, function(err, result) {
        if(err){
            jsonError(res, 400, err)
            errorOccured = true;
        } else {
            if (result && result.length ) {
                const commentIds = JSON.parse(result[0].comments)

                console.log(commentIds)

                // Delete all the comments
                if(commentIds.length > 0){
                    sql.query('DELETE FROM Comments WHERE id IN (?)', [commentIds], function(err, result) {
                        if(err) {
                            jsonError(res, 400, err)
                            errorOccured = true;
                        }
                
                    })
                }
            } else { 
                jsonError(res, 400, "Component doesn't exist!");
                errorOccured = true;
          }
        }
    })
    cb(errorOccured);
}