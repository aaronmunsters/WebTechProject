'use strict'

/*
module.exports = function(req, res, next) {

    sql.query(`Select pages from Components where id = ?`, req.params.id, function(err, result) {
        if(err) return jsonError(res, 400, err)
        else {
          if (result && result.length ) {
              const pageIds = JSON.parse(result[0].pages)
            
              pageIds.map(x => deleteFromPage(res.params.id, x, res))
          } else { 
              jsonError(res, 400, "Component doesn't exist!");
          }
        }
    })
}

function deleteFromPage(compId, pageId, res) {

    sql.query(`Select compsL, compsM, compsR from Pages where id = ?`, pageId, function(err, result) {
        if(err) return jsonError(res, 400, err)
        else {
          if (result && result.length ) {
              var compsL = JSON.parse(result[0].compsL)
              var compsR = JSON.parse(result[0].compsR)
              var compsM = JSON.parse(result[0].compsM)

              compsL = JSON.stringify(compsL.splice( list.indexOf(compId), 1 ));
              compsR = JSON.stringify(compsR.splice( list.indexOf(compId), 1 ));
              compsM = JSON.stringify(compsM.splice( list.indexOf(compId), 1 ));

              sql.query(`UPDATE Pages SET compsL = ?, compsR = ?, compsM = ? WHERE id = ?`, [compsL, compsR, compsM, pageId], function(err, result) {
                  if(err) return jsonError(res, 400, err)
                  else next()
              })    
          } else { 
              jsonError(res, 400, "Component doesn't exist!");
          }
        }
    })
}*/