'use strict'
/*
*
* Removes an element from an array if it contains it
*
*/

module.exports = function(array, e) {
    
    const possible_index = array.indexOf(e);
    if(possible_index > -1) array.splice(possible_index, 1);

    return array;
}
