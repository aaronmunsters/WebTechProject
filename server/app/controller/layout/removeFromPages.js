'use strict'
/*
*   LAYOUT REMOVER: PAGE
*
*   In this file a function is defined that will be called when
*   a page is deleted, it will delete the page id from all components it contained
*
*   since a page can never have NO layout, deleting here means setting it to the default layout
*
*/
const sql = require('../../../db.js');
const jsonError = require('../../util/jsonError.js');

module.exports = function(req, res, layoutId, cb) {

    sql.query('SELECT pages FROM Layouts WHERE id = ?', layoutId, function(err, result) {

        if(err) {
            jsonError(res, 500, err);
        } else {
            if (result && result.length ) {

                // Get the pages the layout is used in
                const pageIds = JSON.parse(result[0].pages)

                // Edit all these pages to have the basic layout
                 sql.query('UPDATE Pages SET layout = "Default" WHERE id IN (?)', [pageIds], function(err, result) {
                    if(err) jsonError(res, 500, err);
                    else cb()
                })
            } else { 
                jsonError(res, 400, "Page doesn't exist!");
            }
        }
    })
}