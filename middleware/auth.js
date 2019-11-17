//the only function of this file serves as middleware
//to have private routes when authenticated (by having the token)

//this is useful because from now on if we want a private route
//with auth we just have to add this piece of middleware
//on route endpoint as second parameter

const config = require('config');
const jwt = require('jsonwebtoken');

function auth(req, res, next) {
    //fetching the token passed in the request
    const token = req.header('x-auth-token');

    //check for token
    //important to return the res, otherwise we will get error due to sensing more than one res response
    if (!token) return res.status(401).json({ msg: 'Authorization denied' });

    try {
        //verify token
        //when authenticating on registering and login in, we set payload as user id
        //verify is returning this payload
        const decoded = jwt.verify(token, config.get('jwtSecret'));
        req.user = decoded;
        //we need next() to call the next middleware (the following function in the route calling this)
        next();
    } catch (e) {
        res.status(400).json({ msg: ' Token is not valid ' });
    }
}

module.exports = auth;
