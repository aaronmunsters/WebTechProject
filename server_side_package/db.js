'use strict';

const mysql = require('mysql');
const dotenv = require('dotenv');


// Local mysql db connection
var connection = mysql.createConnection({
    host     : process.env.DATABASE_HOST || '0.0.0.0',
    port     : '3306',
    user     : 'root',
    password : process.env.DATABASE_PASSWORD,
    database : 'WoxDB',
    dateStrings: 'date'
});

connection.connect(function(err) {
    if (err) throw err;
});

module.exports = 5;