'use strict'
const bcrypt = require('bcryptjs');

module.exports.hash_password = async function (pass) {
    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(pass, salt);
    return hashedPass
}

module.exports.check_passwords = async function (given, stored) {
    return await bcrypt.compare(given, stored);
}
