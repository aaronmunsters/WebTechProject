'use strict'
/*
*
*   uses bcrypt package to compare a bcrypt hashed password
*   (the hashing was done by /app/routes/middlewares/user/passwordHasher.js)
*
*/
const bcrypt = require('bcryptjs');

module.exports = async function (given, stored) {
    return await bcrypt.compare(given, stored);
}
