'use strict'
/*
*   EXPRESS SERVER
*
*   in this file the express server will be created and started
*   all used routes and middelwares will also be added to the server here
*/
const express = require("express");
const app = express();
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");


// Initialise dotenv environment
dotenv.config();

// Middelwares
app.set('port', process.env.SERVER_PORT || 3001);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());


// Import routes
const userRoute = require("./app/routes/user");
const layoutRoute = require("./app/routes/layout");
const pageRoute = require("./app/routes/page");
const componentRoute = require("./app/routes/component");
const imageRoute = require("./app/routes/image");

// Add routes
userRoute(app);
layoutRoute(app);
pageRoute(app);
componentRoute(app);
imageRoute(app);


/* THIS SHOULD BE UNCOMMENTED WHEN WORKING ON THE REACT BUILD
app.use(express.static(path.join(__dirname, '../client-site-web-builder/build')));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../client-side_web_builder/build', '/index.html'));
});
*/

// Server boot
app.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
})
