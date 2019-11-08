const router = require("express").Router();

// hardcoded the data in the server, this should be fetched from the database!
let response = {
  collType: "single",
  backgroundColor: "white",
  navigationBar: "simple"
};

router.post("/", async (req, res) => {
  response = req.body;
  console.log("Set data to: ", response);
  res.send("got em");
});

router.get("/", async (req, res) => {
  res.send(response);
  console.log("Responded with: ", response);
});

module.exports = router;
