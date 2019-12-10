'use strict'
/*
*   MIDDLEWARE: DATE ADDER
*
*   In this file a middleware function is defined that will store the current date
*   in the request
*  
*/
const jsDate_to_sqlDate = require('./util/dateConverter.js');

module.exports = function(req, res, next){
    req.body.date = jsDate_to_sqlDate(Date.now())
    next()
}