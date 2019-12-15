'use strict'
'use strict'
/*
*
* takes a result, error code and error message and send a json error
*
*/

module.exports = function(res, code, msg) {
    return res.json({
        error : msg,
        code : code
    })
}