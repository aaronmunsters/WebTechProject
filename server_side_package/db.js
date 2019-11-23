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
    dateStrings: 'date',
});


connection.connect(function(err) {
    if (err) {
        throw err
    } else {
        console.log("Connection to mysql database succesful!")
    }
});

module.exports = connection;