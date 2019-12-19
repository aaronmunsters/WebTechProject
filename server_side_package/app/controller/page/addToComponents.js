'use strict'
/*
*   PAGE ADDER: COMPONENT
*
*   In this file a function is defined that will be called when
*   a page is created/updated, it will add the page id to all components it was created with
*
*/
const sql = require('../../../db.js');
const jsonError = require('../../util/jsonError.js');
const loopOverComps = require('./util/loopOverComps.js');

module.exports = function(req, res, pageId, cb) {
    cb(loopOverComps(req, res, pageId, addToComponent))
}

function addToComponent(compId, pageId, res) {

    sql.query("SELECT pages FROM WoxComponents WHERE id = ?" , compId, function(err, result) {

        // For error handling
        var errorOccured = false;

        if(err) {
            jsonError(res, 500, err)
            errorOccured = true;
        } else {
            if (result && result.length ) {

                // Get original pages
                const pages = JSON.parse(result[0].pages)

                // Add the new page
                pages.push(pageId)

                // Push to database
                sql.query('UPDATE WoxComponents SET pages = ? WHERE id = ?', [JSON.stringify(pages), compId], function(err, result) {
                    if(err) {
                        jsonError(res, 500, err)
                        errorOccured = true;
                    }
                })    
            } else { 
                res.error = "Trying to add page to non-existant component: " + compId;
            }
        }
        return errorOccured;
    })
}