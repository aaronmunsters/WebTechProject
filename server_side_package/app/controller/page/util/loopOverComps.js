'use strict'
/*
*
*   Function that loops over all possible component lists inside the given request
*   it will apply the given function on each componentId inside the lists
*
*   possible compslists: compsL, compsR, compsM
*
*   the function should take 3 arguments: a componentId, the pageId and the result of the request(to send errors)
*
*/

module.exports = function(req, res, pageId, func) {

    // Get possible lists
    var compsL = [];
    if('compsL' in req.body) compsL = JSON.parse(req.body.compsL);
    var compsR = [];
    if('compsR' in req.body) compsR = JSON.parse(req.body.compsR);
    var compsM = [];
    if('compsM' in req.body) compsM = JSON.parse(req.body.compsM);

    const compsLists = [compsL, compsR, compsM];

    // Innerloop that will handle one complist
    function innerLoop(comps) {
        var fatalErrorOccured = false;

        // Loop over all comps but stop if false is returned once
        for (var j = 0; j < comps.length; j++) {
           fatalErrorOccured |= func(comps[j], pageId, res)
           if(fatalErrorOccured) break;
        }
        return fatalErrorOccured
    }

    // Outer loop over three comps lists
    var errorOccured = false;
    for(var i = 0; i < compsLists.length; i++) {
        errorOccured |= innerLoop(compsLists[i])
        if(errorOccured) break;
    }
    return errorOccured;
}