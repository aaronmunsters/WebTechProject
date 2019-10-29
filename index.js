const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');    

// Import routes
const authRoute = require('./routes/auth')

// Initialise dotenv environment
dotenv.config(); 

// Connect to database
const connection = mongoose.connect(process.env.DB_CONNECT,
                                    {useNewUrlParser: true, useUnifiedTopology: true},
                                    () =>  console.log("Connected to database!")
);

// Middelwares
app.use(express.json());

// Route middelwares
app.use('/api/user', authRoute);   // To go to authRoute, go to api/user/register


app.listen(3000, () => console.log("Server is up and running!"));