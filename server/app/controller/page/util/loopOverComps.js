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

module.exports = function(req, res, compsLists, pageId, func) {

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