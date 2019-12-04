'use strict'
/*
*   MIDDELWARE FUNCTION
*
*   verifies given session token if there is one, adds corresponding user id to request
*/
const jwt = require('jsonwebtoken');

// Token verification 
module.exports = function (req, res, next){

    // Check if the token is in the header
    const token = req.header('auth-token');
    if(!token) return res.status(401).send('Acces denied!');

    try{
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    }catch(err){
        res.status(400).send('Invalid token!');
    }
}