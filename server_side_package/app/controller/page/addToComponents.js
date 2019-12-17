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
        if(err) {
            jsonError(res, 400, err)
            return true;
        } else {
            if (result && result.length ) {

                // Get original pages
                console.log("COMP ID: ", compId);
                const pages = JSON.parse(result[0].pages)
                console.log("OLD PAGES: " + pages)

                // Add the new page
                pages.push(pageId)

                console.log("NEW PAGES" + pages);

                // Push to database
                sql.query('UPDATE WoxComponents SET pages = ? WHERE id = ?', [JSON.stringify(pages), compId], function(err, result) {
                    if(err) {
                        jsonError(res, 400, "Error updating component: " + compId)
                        return true;
                    } else return false;
                })    
            } else { 
                res.error = res.error + "Trying to add page to non-existant component: " + compId;
                return false;
            }
        }
    })
}