const router = require('express').Router();

// Register route
router.post('/register', (req, res) => {
    res.send('Register');
});

// ---> localhost:3000:/api/user/register


// Login route
router.post('/login', (req, res) => {
    res.send('Login');
});

// ---> localhost:3000:/api/user/login

// Export the router such that it can be used in index.js
module.exports = router;