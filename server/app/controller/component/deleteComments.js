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
const deleteReplies = require('../comment/deleteReplies.js');

module.exports = function(req, res, cb) {

    sql.query('SELECT comments FROM WoxComponents WHERE id = ?', req.params.value, function(err, result) {

        // For error handling
        var errorOccured = false;

        if(err){
            jsonError(res, 500, err)
            errorOccured = true;
        } else {
            if (result && result.length ) {

                // Get comment ids
                const commentIds = JSON.parse(result[0].comments)

                // Delete all the replies on the comments
                for(var i = 0; i < commentIds.length; i++) {
                    deleteReplies(req, res, commentIds[i], function(err) {
                        errorOccured = err;
                    })
                    if(errorOccured) break;
                }

                if(!errorOccured) {
                    if(commentIds.length > 0) {
                        // Delete all the comments
                        sql.query('DELETE FROM Comments WHERE id IN (?)', [commentIds], function(err, result) {
                            if(err) jsonError(res, 500, err)
                            else cb()
                        })
                    } else cb()
                }
            } else { 
                jsonError(res, 400, "Component doesn't exist!");
          }
        }
    })
}