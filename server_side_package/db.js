'use strict';

const mysql = require('mysql');
const dotenv = require('dotenv');


// Local mysql db connection
var connection = mysql.createConnection({
    host     : 'localhost',
    port     : '3306',
    user     : 'root',
    password : process.env.DB_PASS,
    database : 'WoxDB',
    dateStrings: 'date'
});

connection.connect(function(err) {
    if (err) throw err;
});

module.exports = 5;