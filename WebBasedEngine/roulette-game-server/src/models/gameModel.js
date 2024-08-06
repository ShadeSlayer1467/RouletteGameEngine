// src/models/gameModel.js
const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    rouletteResult: {
        type: Number,  // for simplicity, using number to represent roulette result
        required: true
    },
    bets: [{
        player: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        amount: {
            type: Number,
            required: true
        },
        betType: {
            type: String,
            required: true
        },
        betValue: {
            type: String,
            required: true
        },
        payout: {
            type: Number,
            required: true
        }
    }],
    gameDate: {
        type: Date,
        default: Date.now
    }
});

const Game = mongoose.model('Game', gameSchema);
module.exports = Game;
