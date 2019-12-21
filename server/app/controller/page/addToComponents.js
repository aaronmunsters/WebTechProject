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

     // Get possible lists
     var compsL = [];
     if('compsL' in req.body) compsL = JSON.parse(req.body.compsL);
     var compsR = [];
     if('compsR' in req.body) compsR = JSON.parse(req.body.compsR);
     var compsM = [];
     if('compsM' in req.body) compsM = JSON.parse(req.body.compsM);

    // Add it to comps that are new in the lists and callback if no error occurred
    if(!loopOverComps(req, res, [compsL, compsR, compsM], pageId, addToComponent)) cb();
}

function addToComponent(compId, pageId, res) {

    sql.query("SELECT pages FROM WoxComponents WHERE id = ?" , compId, function(err, result) {

        if(err) {
            jsonError(res, 500, err)
            return true;
        } else {
            if (result && result.length ) {

                // Get original pages
                const pages = JSON.parse(result[0].pages)

                // Add the new page
                if(!pages.includes(pageId)) pages.push(pageId)

                // Push to database
                sql.query('UPDATE WoxComponents SET pages = ? WHERE id = ?', [JSON.stringify(pages), compId], function(err, result) {
                    if(err) {
                        jsonError(res, 500, err)
                        return true;
                    } return false;
                })    
            } else { 
                res.error = "Trying to add page to non-existant component: " + compId;
                return false;
            }
        }
    })
}