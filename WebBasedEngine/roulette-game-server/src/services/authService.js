// src/services/authService.js
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const config = require('../config/index');

const authService = {
    async register(userData) {
        const { username, email, password } = userData;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw new Error('User already exists with this email.');
        }

        const newUser = new User({ username, email, password });
        await newUser.save();

        return { message: "User registered successfully", userId: newUser._id };
    },

    async login(email, password) {
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error('Invalid credentials.');
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            throw new Error('Invalid credentials.');
        }

        const token = jwt.sign({ userId: user._id }, config.jwtSecret, { expiresIn: '1h' });
        return { token, userId: user._id, username: user.username };
    },

    verifyToken(token) {
        try {
            const decoded = jwt.verify(token, config.jwtSecret);
            return decoded;
        } catch (error) {
            throw new Error('Failed to authenticate token.');
        }
    },

    async getUserById(userId) {
        const user = await User.findById(userId);
        if (!user) {
            throw new Error('User not found.');
        }
        return user;
    }
};

module.exports = authService;
