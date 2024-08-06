// config/index.js

require('dotenv').config();
const db = require('./db');

module.exports = {
    db,
    jwtSecret: process.env.JWT_SECRET || 'default_jwt_secret',
    port: process.env.PORT || 3000,
    debugMode: process.env.DEBUG_MODE || 'false'
};
