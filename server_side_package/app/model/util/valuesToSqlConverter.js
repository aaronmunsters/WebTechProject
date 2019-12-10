'use strict' 
/*
*   Takes an array of column names and an array of corresponding values,
*   converts this to following string:
*
*   cols = [a, b, c]    vals = [1, 2, 3]
*   --> "a = 1, b = 2, c = 3"
*
*   this is used in the sqlFunctionCreators to create some query strings
*
*/

module.exports = function (module) {
                    const keys = getKeys(module);
                    const values = getValues(keys, module);
                    var lst = [];
                    for (var i = 0; i < keys.length; i++) {
                    lst.push(keys[i] + " = '" + values[i] + "'")
                    }
                    return lst.join(", ")
}

function getKeys(obj){
    var keys = [];
    for(var key in obj){
       keys.push(key);
    }
    return keys;
 }

 function getValues(keys, obj){
    return keys.map(x => obj[x])
 }