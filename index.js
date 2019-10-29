const express = require('express');
const app = express();


// Start actual server at port 3000
app.listen(3000, () => console.log("Server is up and running!"));

// Import routes
const authRoute = require('./routes/auth');


// Route middelwares
app.use('/api/user', authRoute);   // To go to authRoute, go to api/user/register