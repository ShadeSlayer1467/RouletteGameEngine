// routes/gameRoutes.js
const express = require('express');
const router = express.Router();
const gameController = require('../api/controllers/gameController');
const authenticateToken = require('../middleware/authenticateToken');

router.post('/bet', authenticateToken, gameController.placeBet);
router.get('/results/:id', authenticateToken, gameController.getGameResults);

module.exports = router;
