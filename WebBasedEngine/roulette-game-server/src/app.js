// app.js

const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const gameRoutes = require('./routes/gameRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());  // Parses JSON data in request bodies

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, '../public')));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/games', gameRoutes);

// Catch-all route for non-existent API calls
app.use((req, res, next) => {
    res.status(404).send('API endpoint does not exist');
});

module.exports = app;
