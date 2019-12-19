'use strict'
/*
*   COMMENT REMOVAL: COMPONENT
*
*   In this file a function is defined that will be called when
*   a comment is removed, it will delete the comment id from the component
*   it appeared in
*
*/
const sql = require('../../../db.js');
const jsonError = require('../../util/jsonError.js');
const removeFromArray = require('../util/removeFromArray.js');

module.exports = function(req, res, cb) {

    sql.query('SELECT component FROM Comments WHERE id = ?', req.params.value, function(err, result) {
      if(err){
            jsonError(res, 500, err)
        } else {
            if (result && result.length ) {
                // Delete the commentId from the component's list of comments
                const componentId = result[0].component
                if(!removeFromComponent(componentId, req.params.value, res)) cb()
            } else { 
                jsonError(res, 400, "Comment doesn't exist: " + req.params.value);
          }
        }
    })
}

function removeFromComponent(compId, commId, res) {

    sql.query('Select comments from WoxComponents where id = ?', compId, function(err, result) {

        // For errorhandling
        var errorOccured = false;

        if(err) {
            jsonError(res, 500, err)
            errorOccured = true;
        } else {
            if (result && result.length ) {

              const new_comments = JSON.stringify(removeFromArray(JSON.parse(result[0].comments), commId));

              sql.query('UPDATE WoxComponents SET comments = ? WHERE id = ?', [new_comments, compId], function(err, result) {
                  if(err) {
                      jsonError(res, 500, err)
                      errorOccured = true;
                  }
              })    
          } else { 
                res.error = res.error + "Trying to delete comment from non-existant component: " + compId
          }
        }
        return errorOccured;
    })
}