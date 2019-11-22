'use strict';

const mysql = require('mysql');
const dotenv = require('dotenv');


// Local mysql db connection
var connection = mysql.createConnection({
    host     : process.env.DATABASE_HOST,
    port     : '3306',
    user     : 'root',
    password : process.env.DATABASE_PASSWORD,
    database : 'WoxDB',
    dateStrings: 'date'
});

connection.connect(function(err) {
    console.log(process.env.DATABASE_HOST);
    if (err) throw err;
});

module.exports = connection;