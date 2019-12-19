'use strict'
/*
*   COMMENT ADDER: COMPONENT
*
*   In this file a function is defined that will be called when
*   a comment is created/updated, it will add the comment id to the component it was created with
*
*/
const sql = require('../../../db.js');
const jsonError = require('../../util/jsonError.js');

module.exports = function(req, res, commentId, cb) {

    if('component' in req.body) {

        // Get the layoutId
        const componentId = req.body.component

        sql.query("SELECT comments FROM WoxComponents WHERE id = ?", componentId, function(err, result) {
            if(err) {
                jsonError(res, 500, err)
            } else {
                if (result && result.length ) {
    
                    // Get original comments
                    const comments = JSON.parse(result[0].comments)
    
                    // Add the new page
                    comments.push(commentId)
    
                    // Push to database
                    sql.query('UPDATE WoxComponents SET comments = ? WHERE id = ?', [JSON.stringify(comments), componentId], function(err, result) {
                        if(err) jsonError(res, 500, err)
                        else cb()
                    })    
                } else { 
                    jsonError(res, 400, "Trying to add page to non-existant component: " + componentId);
                }
            }
        })
    } else cb();
}