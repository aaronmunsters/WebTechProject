const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

// Establish a connection with the database
mongoose.connect(process.env.DB_CONNECT,
                 { useNewUrlParser: true });

// Add console error logging 
var connection = mongoose.connection;

connection.on('connected', ()=> console.log("Connection to database succesful!"));
connection.on('disconnected', ()=> console.log("Connection to database borken!"));
connection.on('error', ()=> console.log("Error trying to connect to database!"));

module.exports = connection;
console.log(encodeURIComponent(process.env.DB_CONNECT));