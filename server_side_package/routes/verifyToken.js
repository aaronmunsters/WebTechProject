const jwt = require('jsonwebtoken');


// Token verification 
function auth(req, res, next){

    // Check if the token is in the header
    const token = req.header('auth-token');
    if(!token) res.status(401).send('Acces denied!');

    try{
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
    }catch(err){
        res.status(400).send('Invalid token!');
    }
}

// USED FOR PRIVATE ROUTES!

