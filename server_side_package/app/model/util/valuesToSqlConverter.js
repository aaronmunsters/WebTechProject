'use strict' 

module.exports = function to_sql_string(cols, vals) {
                    const lst = cols.slice()
                    for (var i = 0; i < lst.length; i++) {
                    lst[i] = cols[i] + " = '" + vals[i] + "'"
                    }
                    return lst.slice(1).join(", ")
}