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

    var errorOccured = false;

    sql.query('SELECT component FROM Comments WHERE id = ?', req.params.id, function(err, result) {
        if(err){
            jsonError(res, 400, err)
            errorOccured = true;
        } else {
            if (result && result.length ) {
                // Delete the commentId from the component's list of comments
                const componentId = result[0].component
                errorOccured = removeFromComponent(componentId, req.params.id, res);
            } else { 
                jsonError(res, 400, "Comment doesn't exist: " + req.params.id);
                errorOccured = true;
          }
        }
    })
    cb(errorOccured);
}

function removeFromComponent(compId, commId, res) {

    sql.query('Select comments from WoxComponents where id = ?', compId, function(err, result) {
        if(err) {
            jsonError(res, 400, err)
            return true;
        } else {
            if (result && result.length ) {

              const new_comments = JSON.stringify(removeFromArray(JSON.parse(result[0].comments), commId));

              sql.query('UPDATE WoxComponents SET comments = ? WHERE id = ?', [new_comments, compId], function(err, result) {
                  if(err) {
                      jsonError(res, 400, err)
                      return true;
                  } else return false;
              })    
          } else { 
                res.error = res.error + "Trying to delete comment from non-existant component: " + compId
                return false;
          }
        }
    })
}