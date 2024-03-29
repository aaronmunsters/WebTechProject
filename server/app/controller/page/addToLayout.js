'use strict'
/*
*   PAGE ADDER: LAYOUT
*
*   In this file a function is defined that will be called when
*   a page is created/updated, it will add the page id to the layout it was created with
*
*/
const sql = require('../../../db.js');
const jsonError = require('../../util/jsonError.js');

module.exports = function(req, res, pageId, cb) {

    if('layout' in req.body) {

        // Get the layoutId
        const layoutId = req.body.layout

        sql.query("SELECT pages FROM Layouts WHERE id = ?", layoutId, function(err, result) {
            if(err) {
                jsonError(res, 500, err)
            } else {
                if (result && result.length ) {
    
                    // Get original pages
                    const pages = JSON.parse(result[0].pages)
    
                    // Add the new page
                    if(!pages.includes(pageId)) pages.push(pageId)
    
                    // Push to database
                    sql.query('UPDATE Layouts SET pages = ? WHERE id = ?', [JSON.stringify(pages), layoutId], function(err, result) {
                        if(err) jsonError(res, 500, err)
                        else cb()
                    })    
                } else { 
                    jsonError(res, 400, "Trying to add page to non-existant layout: " + layoutId);
                }
            }
        })
    } else cb();
}