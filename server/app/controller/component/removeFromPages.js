'use strict'
/*
*   COMPONENT REMOVAL
*
*   In this file a function is defined that will be called when
*   a component is removed, it will delete the component id from all the pages
*   it appeared in
*
*/
const sql = require('../../../db.js');
const jsonError = require('../../util/jsonError.js');
const removeFromArray = require('../util/removeFromArray.js');

module.exports = function(req, res, cb) {

    sql.query('SELECT pages FROM WoxComponents WHERE id = ?', req.params.value, function(err, result) {

        // For error handling
        var errorOccured = false;

        if(err){
            jsonError(res, 500, err)
        } else {
            if (result && result.length ) {
              const pageIds = JSON.parse(result[0].pages)

              // Loop over all pages but stop if false is returned once
              for (var i = 0; i < pageIds.length; i++) {
                 errorOccured |= deleteFromPage(req.params.value, pageIds[i], res)
                 if(errorOccured) break;
              }
              if(!errorOccured) cb()

            } else { 
                jsonError(res, 400, "Component doesn't exist!");
          }
        }
    })
}

function deleteFromPage(compId, pageId, res) {

    sql.query('Select compsL, compsM, compsR from Pages where id = ?', pageId, function(err, result) {

        // For errorhandling
        var errorOccured = false;

        if(err) {
            jsonError(res, 500, err)
            errorOccured = true;
        } else {
            if (result && result.length ) {

              const new_compsL = JSON.stringify(removeFromArray(JSON.parse(result[0].compsL), compId));
              const new_compsR = JSON.stringify(removeFromArray(JSON.parse(result[0].compsR), compId));
              const new_compsM = JSON.stringify(removeFromArray(JSON.parse(result[0].compsM), compId));

              sql.query(`UPDATE Pages SET compsL = ?, compsR = ?, compsM = ? WHERE id = ?`, [new_compsL, new_compsR, new_compsM, pageId], function(err, result) {
                  if(err) {
                      jsonError(res, 500, "Error updating page: " + pageId)
                      errorOccured = true;
                  } 
              })    
          } else { 
              res.error = res.error + "Trying to delete component from non-existant page"
          }
        }
        return errorOccured;
    })
}