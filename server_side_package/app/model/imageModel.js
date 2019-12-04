'use strict'
const database_functions = require('./util/sqlFunctionCreators.js')
const uuidv1 = require('uuid/v1'); 
   
// Image object constructor
var image = function(img){
    Object.keys(img).forEach((key) => this[key] = img[key])
    this.id = uuidv1();
    this.columns = function() {return ["id", "name", "filepath", "date"]}
    this.getValues = function() {return this.columns().map(x => this[x])}
};

image.create = database_functions.create_function("Images")
image.get    = database_functions.accessor_id_function("Images")
image.getAll = database_functions.get_all_function("Images", ["id", "name", "filepath", "date"])
image.remove = database_functions.delete_by_id_function("Images")
image.update = database_functions.update_function("Images")

module.exports= image;