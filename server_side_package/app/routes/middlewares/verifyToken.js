'use strict'
/*
*   MIDDLEWARE: TOKEN VERIFIER
*
*   In this file a middleware function is defined that will check if 
*   the required token is in the request header and valid, if not it will return an error
*   if so it will decode the token to put the corresponding user id in the request
*   for use by following middleware/handler functions
*
*/
const jwt = require('jsonwebtoken');
const jsonError = module.require('../../util/jsonError.js');

module.exports = function (req, res, next){

    // Check if the token is in the header
    const token = req.header('auth-token');
    if(!token) return jsonError(res, 401, 'Access denied!');

    try{
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    }catch(err){
        jsonError(res, 401, 'Invalid token!');
    }
}