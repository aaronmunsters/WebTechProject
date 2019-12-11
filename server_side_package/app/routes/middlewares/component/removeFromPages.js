'use strict'

/*
module.exports = function(req, res, next) {

    sql.query(`Select pages from Components where id = ?`, req.params.id, function(err, result) {
        if(err) {
            return jsonError(res, 400, err)
        }
        else {
          if (result && result.length ) {
              const pageIds = result[0].pages
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
              var compsL = result[0].compsL
              var compsR = result[0].compsR
              var compsM = result[0].compsM

              compsL = compsL.splice( list.indexOf(compId), 1 );
              compsR = compsR.splice( list.indexOf(compId), 1 );
              compsM = compsM.splice( list.indexOf(compId), 1 );
              pageIds = result[0].pages

          } else { 
              jsonError(res, 400, "Component doesn't exist!");
          }
        }
    })

}*/