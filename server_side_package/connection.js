const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

// Establish a connection with the database
mongoose.connect("mongodb+srv://wolf3wulf:acklwacklw@test-hss09.mongodb.net/test?retryWrites=true&w=majority",
                 { useNewUrlParser: true });

// Add console error logging 
var connection = mongoose.connection;

connection.on('connected', ()=> console.log("Connection to database succesful!"));
connection.on('disconnected', ()=> console.log("Connection to database borken!"));
connection.on('error', ()=> console.log("Error trying to connect to database!"));

module.exports = connection;