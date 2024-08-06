// src/services/gameService.js
const Game = require('../models/gameModel');
const User = require('../models/userModel');

const gameService = {
    async placeBet(userId, betDetails) {
        const { amount, betType, betValue } = betDetails;

        if (amount <= 0) {
            throw new Error('Bet amount must be greater than zero');
        }

        const user = await User.findById(userId);
        if (!user || user.balance < amount) {
            throw new Error('Insufficient balance or user not found.');
        }

        user.balance -= amount;
        await user.save();

        const rouletteResult = this.spinWheel();
        const game = new Game({
            rouletteResult,
            bets: [{ player: userId, amount, betType, betValue, payout: 0 }] // Payout calculated after result
        });

        if (this.isWinningBet(rouletteResult, betType, betValue)) {
            const payout = this.calculatePayout(amount, betType);
            user.balance += payout;
            game.bets[0].payout = payout;
            await user.save();
        }

        await game.save();
        return game;
    },

    spinWheel() {
        return Math.floor(Math.random() * 37); // Roulette numbers 0-36
    },

    isWinningBet(result, betType, betValue) {
        switch (betType) {
            case 'number':
                return result.toString() === betValue;
            case 'color':
                const blackNumbers = [2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35];
                const redNumbers = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
                if (betValue === 'black') return blackNumbers.includes(result);
                if (betValue === 'red') return redNumbers.includes(result);
                break;
            case 'evenodd':
                if (betValue === 'even') return result !== 0 && result % 2 === 0;
                if (betValue === 'odd') return result % 2 !== 0;
                break;
            case 'dozen':
                if (betValue === 'first') return result >= 1 && result <= 12;
                if (betValue === 'second') return result >= 13 && result <= 24;
                if (betValue === 'third') return result >= 25 && result <= 36;
                break;
            case 'column':
                if (betValue === 'first') return [1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34].includes(result);
                if (betValue === 'second') return [2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35].includes(result);
                if (betValue === 'third') return [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36].includes(result);
                break;
            case 'highlow':
                if (betValue === 'low') return result >= 1 && result <= 18;
                if (betValue === 'high') return result >= 19 && result <= 36;
                break;
        }
        return false;
    },

    calculatePayout(amount, betType) {
        switch (betType) {
            case 'number':
                return amount * 35;
            case 'color':
            case 'evenodd':
            case 'highlow':
                return amount * 2;
            case 'dozen':
            case 'column':
                return amount * 3;
        }
        return 0;
    }
};

module.exports = gameService;
