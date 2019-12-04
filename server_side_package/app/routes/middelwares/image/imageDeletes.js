'use strict'
/*
*   MIDDELWARE FUNCTION
*
*   uses given id to get the image database entry, then uses that to form
*   the path to the actual image and delete it
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
                const entry = result[0]
                // If the entry exists, delete the corresponding file
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