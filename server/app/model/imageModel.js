'use strict'
/*
*   MODEL:  IMAGE
*
*   This file defines the image object,
*   the sqlFunctionCreators are used for all CRUD operations
*
*/
const database_functions = require('./util/sqlFunctionCreators.js');
   
// Image object constructor, will be passed the request body
var image = function(img){

    // Get all request input
    Object.keys(img).forEach((key) => this[key] = img[key])
};

image.create = database_functions.create_function("Images")
image.get    = database_functions.accessor_function("Images")
image.getAll = database_functions.get_all_function("Images")
image.remove = database_functions.delete_by_id_function("Images")
image.update = database_functions.update_function("Images")

module.exports= image;