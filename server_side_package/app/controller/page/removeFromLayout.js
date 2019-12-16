'use strict'
/*
*   PAGE REMOVER: LAYOUT
*
*   In this file a function is defined that will be called when
*   a page is deleted, it will delete the page id from all components it contained
*
*/
const sql = require('../../../db.js');
const jsonError = require('../../util/jsonError.js');
const removeFromArray = require('../util/removeFromArray.js');

module.exports = function(req, res, pageId, cb) {

    var errorOccured = false;

    sql.query('SELECT layout FROM Pages WHERE id = ?', pageId, function(err, result) {
        if(err) {
            jsonError(res, 400, err);
            errorOccured = true;
        } else {
            if (result && result.length ) {
                const layoutId = result[0].layout;
                errorOccured = removeFromLayout(pageId, layoutId, res);
            } else { 
                jsonError(res, 400, "Page doesn't exist!");
                errorOccured = true;
            }
        }
    })
    cb(errorOccured);
}

function removeFromLayout(pageId, layoutId, res) {

    sql.query('SELECT pages FROM Layouts WHERE id = ?', layoutId, function(err, result) {
        if(err) {
            jsonError(res, 400, err);
            return true;
        } else {
            if (result && result.length ) {

                // Get old pages list and remove the pageId from it
                const new_pages = JSON.stringify(removeFromArray(JSON.parse(result[0].pages), pageId));

                // Update to database
                sql.query('UPDATE Layouts SET pages = ? WHERE id = ?', [new_pages, layoutId], function(err, result) {
                    if(err) {
                        jsonError("Error updating layout: " + layoutId)
                        return true;
                    } else return false;
                })    
            } else { 
                res.error = res.error + "Trying to delete component from non-existant layout: " + layoutId
                return false;
            }
        }
    })
}