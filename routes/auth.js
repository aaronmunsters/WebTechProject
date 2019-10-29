const router = require('express').Router();
const User = require('../model/User');
const {registerValidation, loginValidation} = require('../validation');


// Register route
router.post('/register', async (req, res) => {

    // Validate date before making new user
    const {error} = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const user = new User({
        name:       req.body.name,
        email:      req.body.email,
        password:   req.body.password
    });
    
    try{
        console.log("got here"); 
        let savedUser = await user.save();
        console.log(savedUser);
        res.send(savedUser)
    } catch(err){
        res.status(400).send(err);
    }
});

// ---> localhost:3000/api/user/register


// Login route
router.post('/login', (req, res) => {
    res.send('Login');
});

// ---> localhost:3000/api/user/login

// Export the router such that it can be used in index.js
module.exports = router;