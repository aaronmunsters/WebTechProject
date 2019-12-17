'use strict'
/*
*   COMMENT REMOVAL: DELETE REPLIES
*
*   In this file a function is defined that will be called when a comment is removed
*   it will delete all the replies on the comment from the database
*
*/
const sql = require('../../../db.js');
const jsonError = require('../../util/jsonError.js');

module.exports = function(req, res, commentId, cb) {

    sql.query('SELECT replies FROM Comments WHERE id = ?', commentId, function(err, result) {

        // For error handling
        var errorOccured = false;

        if(err){
            jsonError(res, 400, err)
            errorOccured = true;
        } else {
            if (result && result.length ) {

                // Get comments
                const replyIds = JSON.parse(result[0].replies)

                // Delete all the comments
                if(replyIds.length > 0) {
                    sql.query('DELETE FROM Comments WHERE id IN (?)', [replyIds], function(err, result) {
                        if(err) {
                            jsonError(res, 400, err)
                            errorOccured = true;
                        }
                    })
                }
            } else { 
                jsonError(res, 400, "Comment doesn't exist!");
                errorOccured = true;
          }
        }
        // Callback
        cb(errorOccured);
    })
}