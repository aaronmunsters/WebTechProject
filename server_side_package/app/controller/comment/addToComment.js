'use strict'
/*
*   COMMENT ADDER: COMMENT(REPLY)
*
*   In this file a function is defined that will be called when
*   a reply(also a comment) is made on a comment, it will add the reply(comment)id to the replies of the comment
*
*/
const sql = require('../../../db.js');
const jsonError = require('../../util/jsonError.js');

module.exports = function(req, res, commentId, cb) {

        // Get the replyId
        const replyId = req.body.id
        console.log(commentId)

        sql.query('SELECT replies FROM Comments WHERE id = ?', commentId, function(err, result) {
            if(err) {
                jsonError(res, 500, err)
            } else {
                if (result && result.length ) {
    
                    // Get original comments
                    const replies = JSON.parse(result[0].replies)
    
                    // Add the new page
                    if(!replies.includes(replyId)) replies.push(replyId)
    
                    // Push to database
                    sql.query('UPDATE Comments SET replies = ? WHERE id = ?', [JSON.stringify(replies), commentId], function(err, result) {
                        if(err) jsonError(res, 500, err)
                        else cb()
                    })    
                } else { 
                    jsonError(res, 400, "Trying to add reply to non-existant comment: " + commentId);
                }
            }
        })
}