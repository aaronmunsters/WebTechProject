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

module.exports = function(req, res, next) {
    sql.query(`Select * from Images where id = ?`, req.params.id, function(err, result) {
        if(err) {
            console.log("error: ", err);
        }
        else {
          if (result && result.length) {
              // If the entry exists, delete the corresponding file
                const entry = result[0]

                fs.unlink('/usr/src/app/image_uploads/' + entry.id + entry.extension, function(err){
                    if(err) res.status(400).send(err);
                    else next()
                })
          } else { 
                res.status(400).send("No image found for this id!");
          }
        }
    })
}