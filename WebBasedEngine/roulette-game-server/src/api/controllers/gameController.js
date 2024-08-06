// gameController.js
const gameService = require('../../services/gameService');

const gameController = {
    async placeBet(req, res) {
        try {
            const userId = req.user.userId;
            const betDetails = req.body;
            const game = await gameService.placeBet(userId, betDetails);
            res.status(200).json(game);
        } catch (error) {
            console.error(error);
            res.status(400).json({ message: error.message });
        }
    },

    async getGameResults(req, res) {
        try {
            const gameId = req.params.id;
            const game = await gameService.getGameById(gameId);
            if (!game) {
                throw new Error('Game not found');
            }
            res.status(200).json(game);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }
};

module.exports = gameController;
