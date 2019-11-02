const router = require('express').Router();
const User = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {registerValidation, loginValidation} = require('../validation');


// Register route
// ---> localhost:3000/api/user/register
router.post('/register', async (req, res) => {

    // Validate date before making new user
    const {error} = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    // Check if user is already registerd
    console.log('checking if email is already in DB');
    const emailExists = await User.findOne({email : req.body.email});
    console.log('done checking!');
    if(emailExists) return res.status(400).send('Email already exists!');

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    
    // Create the new user
    const user = new User({
        name:       req.body.name,
        email:      req.body.email,
        password:   hashedPassword
    });

    try{
        console.log("got here"); 
        let savedUser = await user.save();
        console.log(savedUser);
        res.send({user: user._id})
    } catch(err){
        res.status(400).send(err);
    }
});


// Login route
// ---> localhost:3000/api/user/login
router.post('/login', async (req, res) => {
    
    // Validate data before logging in
    const {error} = loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    // Check if given email is already in database
    const user = await User.findOne({email : req.body.email});
    if(!user) return res.status(400).send('Email/password is wrong!');

    // Check if password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) res.status(400).send('Email/password is wrong!');
    
    // Create and assign token
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send(token);
});

// Export the router such that it can be used in index.js
module.exports = router;