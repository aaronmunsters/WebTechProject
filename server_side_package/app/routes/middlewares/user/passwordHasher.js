'use strict'
/*
*   MIDDLEWARE: PASSWORD HASHER
*
*   In this file a middleware function is defined that will replace the user typed password
*   inside the request by a hashed version such that passwords aren't
*   explicitly stored in the database
*
*/
const bcrypt = require('bcryptjs');

// Asyncronous helper function that handles the hashing
async function hasher(pass) {
    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(pass, salt);
    return hashedPass
}

module.exports = function(req, res, next) {

    hasher(req.body.password).then(function(hashedPass) {
        req.body.password = hashedPass
        next()
    })
}

