'use strict'
/*
*   URL SLASHES REMOVER
*
*   In this file a function is defined that will be called when
*   a page is  updated/created, it will make sure that the url field doesn't start with a slash
*
*/
module.exports = function(req) {

    if('url' in req.body) {
        while(req.body.url[0] == '/'){
            req.body.url = req.body.url.slice(1)
        }
    }
}