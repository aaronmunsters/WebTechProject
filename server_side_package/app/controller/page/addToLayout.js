'use strict'
/*
*   PAGE ADDER: layout
*
*   In this file a function is defined that will be called when
*   a page is created/updated, it will add the page id to all components it was created with
*
*/
const sql = require('../../../db.js');
const jsonError = require('../../util/jsonError.js');

module.exports = function(req, res, pageId, cb) {

    // Get possible layout to update
    const layoutId = false;
    if('layout' in req.body) layoutId = req.body.layoutId;

    var errorOccured = false
    if(layoutId) {
        sql.query("SELECT pages FROM Layouts WHERE id = ?", layoutId, function(result) {
            if(err) {
                jsonError(res, 400, err)
                errorOccured = true;
            } else {
                if (result && result.length ) {
    
                    // Get original pages
                    const pages = JSON.parse(result[0].pages)
    
                    // Add the new page
                    pages.push(pageId)
    
                    // Push to database
                    sql.query('UPDATE Layouts SET pages = ? WHERE id = ?', [JSON.stringify(new_pages), layoutId], function(err, result) {
                        if(err) {
                            jsonError(res, 400, "Error updating layout: " + layoutId)
                            errorOccured = true;
                        };
                    })    
                } else { 
                    jsonError(res, 400, "Trying to add page to non-existant component: " + compId);
                    errorOccured = true;
                }
            }
        })
    }
    cb(errorOccured);
}