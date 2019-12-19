'use strict'
/*
*   DATE ADDER
*
*   In this file a function is defined that will store the current date
*   in the request
*  
*/
const DATE_FORMATER = require( 'dateformat' );

module.exports = function(req, res, cb){
    req.body.date = DATE_FORMATER( new Date(), "yyyy-mm-dd" );
    cb()
}