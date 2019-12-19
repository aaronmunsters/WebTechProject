"use strict";
/*
 *   EXPRESS SERVER
 *
 *   In this file the express server will be created and started,
 *   all used routes and middlewares will also be added to the server here
 */
const express = require("express");
const app = express();
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const testDBParser = require("./aaronTestDBParse.js");

// Initialise dotenv environment
dotenv.config();

// middlewares
app.set("port", process.env.SERVER_PORT || 3001);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// Import routes
const requrestCounterRoute  = require("./app/routes/requestCounter");
const userRoute             = require("./app/routes/user");
const layoutRoute           = require("./app/routes/layout");
const pageRoute             = require("./app/routes/page");
const componentRoute        = require("./app/routes/component");
const imageRoute            = require("./app/routes/image");
const commentRoute          = require("./app/routes/comment");

// Add routes
requrestCounterRoute(app);
userRoute(app);
layoutRoute(app);
pageRoute(app);
componentRoute(app);
imageRoute(app);
commentRoute(app);

setTimeout(function() {
  testDBParser();
}, 5000);

/* THIS SHOULD BE UNCOMMENTED WHEN WORKING ON THE REACT BUILD
app.use(express.static(path.join(__dirname, '../client-site-web-builder/build')));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../client-side_web_builder/build', '/index.html'));
});
*/

// Server boot
app.listen(app.get("port"), function() {
  console.log("Express server listening on port " + app.get("port"));
});
