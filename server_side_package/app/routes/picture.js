'use strict'
const multer = require('multer');
const upload = multer({dest: __dirname + '../database/uploads/images'});

module.exports = function(app){

    app.route('/picture')
    .post(upload.single('avatar'), function (req, res, next) {
        
      })
};