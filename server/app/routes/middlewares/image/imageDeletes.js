'use strict'
/*
*   MIDDLEWARE: IMAGE DELETION
*
*   In this file a middleware function is defined that will check if 
*   an image entry for the given id exists in the database 
*   if so it will delete the corresponding image from the image_uploads folder
*
*/
const fs = require('fs')
const path = require('path')
const sql = require('../../../../db.js');
const jsonError = require('../../../util/jsonError.js');

module.exports = function(req, res, next) {
    sql.query('Select * from Images where id = ?', req.params.value, function(err, result) {
        if(err) {
            return jsonError(res, 400, err);
        }
        else {
          if (result && result.length) {
              // If the entry exists, delete the corresponding file
                const entry = result[0]

                fs.unlink('/usr/src/app/image_uploads/' + entry.id + entry.extension, function(err){
                    if(err) return jsonError(res, 400, err);
                    else next()
                })
          } else { 
              jsonError(res, 400, "No image found for this id!");
          }
        }
    })
}