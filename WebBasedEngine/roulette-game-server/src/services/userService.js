// userService.js
const User = require('../models/userModel');

const userService = {
    async getUserById(userId) {
        const user = await User.findById(userId);
        if (!user) {
            throw new Error('User not found.');
        }
        return user;
    },

    async updateUserBalance(userId, amount) {
        const user = await User.findById(userId);
        if (!user) {
            throw new Error('User not found.');
        }
        user.balance += amount;
        await user.save();
        return user;
    }
};

module.exports = userService;
