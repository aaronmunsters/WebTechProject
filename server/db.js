'use strict'
/*
*   DATABASE CONNECTION 
*
*   in this file the connection to the database is established and exported
*/
const mysql = require('mysql');

var connection = mysql.createConnection({
    host     : process.env.DATABASE_HOST,
    port     : process.env.DATABASE_PORT,
    user     : 'root',
    password : process.env.DATABASE_PASSWORD,
    database : 'WoxDB',
    dateStrings: 'date',
    charset : 'utf8mb4'
});

connection.connect(function(err) {
    if (err) {
        throw err
    } else {
        console.log("Connection to mysql database succesful!")
    }
});

module.exports = connection;