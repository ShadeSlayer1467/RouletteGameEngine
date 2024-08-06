// src/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../api/controllers/userController');
const authenticateToken = require('../middleware/authenticateToken');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/profile/:id', authenticateToken, userController.getUserProfile);
router.get('/balance', authenticateToken, userController.getUserBalance);

module.exports = router;
