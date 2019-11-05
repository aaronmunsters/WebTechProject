const express = require('express');
const app = express();
const dotenv = require('dotenv');
const path = require('path');
var cors = require("cors");


// Establish and get the database connection from the connection.js file
const connection = require('./connection');

// Import routes
const authRoute = require('./routes/auth');
const layoutRoute = require('./routes/layout');

// Initialise dotenv environment
dotenv.config(); 

// Middelwares

// for some reason when getting a post request this will parse the json again and give an error
//app.use(express.json());
app.use(cors());

/* THIS SHOULD BE UNCOMMENTED WHEN WORKING ON THE REACT BUILD

app.use(express.static(path.join(__dirname, '../client-site-web-builder/build')));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../client-side_web_builder/build', '/index.html'));
});

*/

// Route middelwares
app.use('/api/user', authRoute);   // To go to authRoute, go to api/user/register
app.use('/layout', layoutRoute);


app.listen(3001, () => console.log("Server is up and running!"));