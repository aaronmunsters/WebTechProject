'use strict'
const bcrypt = require('bcryptjs');

module.exports = async function (given, stored) {
    return await bcrypt.compare(given, stored);
}
