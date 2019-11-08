const router = require("express").Router();

// DOESNT WORK BUT SHOULD BE SOMETHING LIKE THIS !

const empties = {
  emptyPage: [
    { id: "Title" },
    { id: "Author" },
    { id: "Created" },
    { id: "Published" },
    { id: "Content" }
  ],
  emptyWoxComponent: [{ id: "Title" }, { id: "Author" }, { id: "Created" }],
  emptyUser: [{ id: "User" }]
};

let pages = [];
let woxComponents = [];
let users = [];

router.post("/", async (req, res) => {
  console.log("Set data to: ", response);
  res.send("got em");
});

router.get("/", async (req, res) => {
  res.send(empties.emptyPage);
  console.log("Responded with: ", empties.emptyPage);
});

module.exports = router;
