const router = require('express').Router();

router.post('/', async (req, res) => {
    console.log(req);
    console.log("test");
    res.send("got em");
});



module.exports = router;
