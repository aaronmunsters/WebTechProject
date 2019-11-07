const router = require("express").Router();

let response = {};

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
