'use strict'
/*
*   PAGE REMOVER(COMPONENT REPLACEMENT): COMPONENT
*
*   In this file a function is defined that will be called when
*   a page is editted, it will delete the page id from all components that aren't in 
*   the page anymore
*
*/
const sql = require('../../../db.js');
const jsonError = require('../../util/jsonError.js');
const remover = require('./removeFromComponents.js');

module.exports = function(req, res, pageId, cb) {

    sql.query("SELECT compsL, compsR, compsM FROM Pages WHERE id = ?", pageId, function(err, result) {
        
        if(err) {
            jsonError(res, 500, err)
        } else {
            if(result && result.length ) {

                const old_compsL = JSON.parse(result[0].compsL)
                const old_compsR = JSON.parse(result[0].compsR)
                const old_compsM = JSON.parse(result[0].compsM)

                // Get possible lists
                var compsL = [];
                if('compsL' in req.body) compsL = JSON.parse(req.body.compsL);
                var compsR = [];
                if('compsR' in req.body) compsR = JSON.parse(req.body.compsR);
                var compsM = [];
                if('compsM' in req.body) compsM = JSON.parse(req.body.compsM);


                const comps = old_compsL.concat(old_compsR, old_compsM);
                var errorOccured = false;

                 // If a component isn't in any of the new lists the pageId needs to be removed from its list of pages
                for(var i = 0; i < comps.length; i++) {
                    if(!compsL.includes(comps[i]) && !compsR.includes(comps[i]) && !compsM.includes(comps[i])){
                        errorOccured |= remover.removePageFromComp(comps[i], pageId, res);
                        if(errorOccured) break;
                    }
                }
                if(!errorOccured) cb()
            
            } else {
                jsonError(res, 400, "Page to delete from components' pages list doesn't exist!")
            }
        }
    })
}