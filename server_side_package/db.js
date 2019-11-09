'user strict';

const mysql = require('mysql');
const dotenv = require('dotenv');

// Local mysql db connection
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : process.env.DB_PASS,
    database : 'WoxDB'
});

connection.connect(function(err) {
    if (err) throw err;
});

module.exports = connection;