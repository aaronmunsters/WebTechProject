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

    sql.query('SELECT layout FROM Pages WHERE id = ?', pageId, function(err, result) {

        // For error handling
        var errorOccured = false;

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
        // Callback
        cb(errorOccured);
    })
}

function removeFromLayout(pageId, layoutId, res) {

    sql.query('SELECT pages FROM Layouts WHERE id = ?', layoutId, function(err, result) {

        // For error handling
        var errorOccured = false;
        
        if(err) {
            jsonError(res, 400, err);
            errorOccured = true;
        } else {
            if (result && result.length ) {

                // Get old pages list and remove the pageId from it
                const new_pages = JSON.stringify(removeFromArray(JSON.parse(result[0].pages), pageId));

                // Update to database
                sql.query('UPDATE Layouts SET pages = ? WHERE id = ?', [new_pages, layoutId], function(err, result) {
                    if(err) {
                        jsonError(res, 400, err)
                        errorOccured = true;
                    }
                })    
            } else { 
                res.error = res.error + "Trying to delete page from non-existant layout: " + layoutId
            }
        }
        return errorOccured;
    })
}