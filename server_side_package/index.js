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
const pageRoute = require("./app/routes/page");
const componentRoute = require("./app/routes/component");

// Middelwares
app.set('port', process.env.PORT || 3001);
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
componentRoute(app);

app.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
})
