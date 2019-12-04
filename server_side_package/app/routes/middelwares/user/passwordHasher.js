'use strict'
/*
*   MIDDELWARE FUNCTION
*
*   replaces the given password in the request with a hashed version
*/

const bcrypt = require('bcryptjs');

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

