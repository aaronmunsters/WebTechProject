const express = require("express");
const app = express();
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");


// Initialise dotenv environment
dotenv.config();

// Establish and get the database connection from the connection.js file
const connection = require("./db");

// Import routes
const userRoute = require("./app/routes/user");
const layoutRoute = require("./app/routes/layout");
const pageRoute = require("./app/routes/pages");

// Middelwares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());


/* THIS SHOULD BE UNCOMMENTED WHEN WORKING ON THE REACT BUILD

app.use(express.static(path.join(__dirname, '../client-site-web-builder/build')));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../client-side_web_builder/build', '/index.html'));
});

*/

// Route middelwares
userRoute(app);
layoutRoute(app);
pageRoute(app);

app.listen(3001, () => console.log("Server is up and running!"));
