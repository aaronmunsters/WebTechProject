'use strict'
/*
*   MIDDLEWARE: COMPONENT REMOVED
*
*   In this file a middleware function is defined that will be called when
*   a component is removed, it will delete the component id from all the pages
*   it appeared in
*
*/
const sql = require('../../../../db.js');
const jsonError = require('../../../util/jsonError.js');
const removeFromArray = require('../util/removeFromArray.js');

module.exports = function(req, res, next) {

    sql.query('SELECT pages FROM WoxComponents WHERE id = ?', req.params.id, function(err, result) {
        if(err) return jsonError(res, 400, err)
        else {
          if (result && result.length ) {
              const pageIds = JSON.parse(result[0].pages)

              // Loop over all pages but stop if false is returned once
              for (var i = 0; i < pageIds.length; i++) {
                  if(!deleteFromPage(req.params.id, pageIds[i], res)) break;
              }
              next()

          } else { 
              return jsonError(res, 400, "Component doesn't exist!");
          }
        }
    })
}

function deleteFromPage(compId, pageId, res) {
    console.log("calling this");

    sql.query('Select compsL, compsM, compsR from Pages where id = ?', pageId, function(err, result) {
        if(err) return jsonError(res, 400, err)
        else {
          if (result && result.length ) {

              const new_compsL = JSON.stringify(removeFromArray(JSON.parse(result[0].compsL), compId));
              const new_compsR = JSON.stringify(removeFromArray(JSON.parse(result[0].compsR), compId));
              const new_compsM = JSON.stringify(removeFromArray(JSON.parse(result[0].compsM), compId));

              sql.query(`UPDATE Pages SET compsL = ?, compsR = ?, compsM = ? WHERE id = ?`, [new_compsL, new_compsR, new_compsM, pageId], function(err, result) {
                  if(err) {
                      jsonError(res, 400, err);
                      return false
                  } else return true;
              })    
          } else { 
              jsonError(res, 400, "Trying to delete component from page that doesn't exist; component: " + compId + ", page: "+ pageId);
              return false;
          }
        }
    })
}