// src/middleware/authenticateToken.js
const jwt = require('jsonwebtoken');
const config = require('../config/index');

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401); // if no token, unauthorized

    jwt.verify(token, config.jwtSecret, (err, user) => {
        if (err) return res.sendStatus(403); // if token not valid
        req.user = user; // Attach the user to the request object
        next(); // proceed to the next middleware
    });
}

module.exports = authenticateToken;
