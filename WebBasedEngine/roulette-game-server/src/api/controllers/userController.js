// src/api/controllers/userController.js
const authService = require('../../services/authService');

const userController = {
    async register(req, res) {
        try {
            const userData = req.body;
            const result = await authService.register(userData);
            res.status(201).json(result);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    async login(req, res) {
        try {
            const { email, password } = req.body;
            const result = await authService.login(email, password);
            res.status(200).json(result);
        } catch (error) {
            res.status(401).json({ message: error.message });
        }
    },

    async getUserProfile(req, res) {
        try {
            const userId = req.params.id;
            const user = await authService.getUserById(userId);
            res.status(200).json(user);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    },

    async getUserBalance(req, res) {
        try {
            const userId = req.user.userId;
            const user = await authService.getUserById(userId);
            res.status(200).json({ balance: user.balance });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
};

module.exports = userController;
