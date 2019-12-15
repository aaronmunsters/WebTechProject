'use strict'
/*
*   PAGE REMOVER: COMPONENT
*
*   In this file a function is defined that will be called when
*   a page is deleted, it will delete the page id from all components it contained
*
*/
const sql = require('../../../db.js');
const jsonError = require('../../util/jsonError.js');
const loopOverComps = require('./util/loopOverComps.js');
const removeFromArray = require('../util/removeFromArray.js');

module.exports = function(req, res, pageId, cb) {

    sql.query("SELECT compsL, compsR, compsM FROM Pages WHERE id = ?", pageId, function(err, result) {
        if(err) {
            jsonError(res, 400, err)
            cb(true)
        } else {
            if(result && result.length ) {

                // To be able to use the loopOverComps function the compslists need to be in the body
                req.body.compsL = JSON.parse(result[0].compsL)
                req.body.compsR = JSON.parse(result[0].compsR)
                req.body.compsM = JSON.parse(result[0].compsM)

                cb(loopOverComps(req, res, pageId, removePageFromComp))
            } else {
                jsonError(res, 400, "Page to delete from components' pages list doesn't exist!")
                cb(true)
            }
        }
    })
}

function removePageFromComp(compId, pageId, res) {

    sql.query("SELECT pages FROM WoxComponents WHERE id = ?" , compId, function(err, result) {
        if(err) {
            jsonError(res, 400, err)
            return true;
        } else {
            if (result && result.length ) {

                // Get original pages and remove this given page form it
                const new_pages = JSON.stringify(removeFromArray(JSON.parse(result[0].pages), pageId))

                // Push to database
                sql.query('UPDATE WoxComponents SET pages = ? WHERE id = ?', [new_pages, compId], function(err, result) {
                    if(err) {
                        jsonError(res, 400, "Error updating component: " + compId)
                        return true;
                    } else return false;
                })    
            } else { 
                res.error = res.error + "Trying to delete page from non-existant component: " + compId;
                return false;
            }
        }
    })
}