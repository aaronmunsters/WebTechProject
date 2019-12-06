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

module.exports = function to_sql_string(cols, vals) {
                    const lst = cols.slice()
                    for (var i = 0; i < lst.length; i++) {
                    lst[i] = cols[i] + " = '" + vals[i] + "'"
                    }
                    return lst.slice(1).join(", ")
}