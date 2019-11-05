const express = require('express');
const app = express();
const dotenv = require('dotenv');

// Establish and get the database connection from the connection.js file
const connection = require('./connection');

// Import routes
const authRoute = require('./routes/auth');
const layoutRoute = require('./routes/layout');

// Initialise dotenv environment
dotenv.config(); 

// Middelwares
app.use(express.json());

// Route middelwares
app.use('/api/user', authRoute);   // To go to authRoute, go to api/user/register
app.use('/layout', layoutRoute);


app.listen(3000, () => console.log("Server is up and running!"));