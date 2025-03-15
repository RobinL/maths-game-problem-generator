import BaseMultiplicationProblem from '../base/BaseMultiplicationProblem.js';
import { DIFFICULTY_LEVELS } from '../../difficulty/DifficultyLevel.js';

/**
 * Multiplication problem for Year 6
 * @extends BaseMultiplicationProblem
 */
export default class Year6MultiplicationProblem extends BaseMultiplicationProblem {

    constructor() {
        super(DIFFICULTY_LEVELS.year6);
        this.symbol = '×';
        this.generate()
    }

    generate() {
        // By the end of primary school, children can deploy all their multiplication knowledge in mental math
        // They recall all table facts through 12×12 effortlessly and use them in complex mental calculations
        // They can multiply multi-digit numbers in parts
        // They understand and apply the order of operations (BODMAS/BIDMAS) in mental arithmetic
        // They can even mentally multiply two decimals in simple cases

        // Randomly choose between different types of Year 6 multiplication problems
        const problemType = this._getRandomInt(1, 5);

        let a, b, expression, expression_short;

        switch (problemType) {
            case 1: // Multiply two-digit by one-digit with partitioning (e.g., 36 × 4 = 144)
                a = this._getRandomInt(15, 50);
                b = this._getRandomInt(3, 9);
                expression = `${a} ${this.symbol} ${b}`;
                break;

            case 2: // Multiply using factors (e.g., 25 × 16 = 400)
                // Choose numbers that can be factored easily for mental calculation
                const factorPairs = [
                    [25, 16], [25, 24], [25, 32], [25, 36],
                    [50, 12], [50, 16], [50, 18], [50, 24],
                    [75, 8], [75, 12], [75, 16], [75, 24]
                ];
                const pair = factorPairs[this._getRandomInt(0, factorPairs.length - 1)];
                a = pair[0];
                b = pair[1];
                expression = `${a} ${this.symbol} ${b}`;
                // Create a shorter version for display constraints
                expression_short = `${a}×${b}`;
                break;

            case 3: // Multiply decimals by powers of 10 (e.g., 0.5 × 100 = 50)
                a = this._getRandomInt(1, 9) / 10;
                if (this._getRandomInt(0, 1) === 1) {
                    a = this._getRandomInt(1, 9) / 100; // Sometimes use hundredths
                }
                b = [10, 100, 1000][this._getRandomInt(0, 2)];
                expression = `${a} ${this.symbol} ${b}`;
                break;

            case 4: // Multiply two decimals (e.g., 0.5 × 0.2 = 0.1)
                // Choose simple decimal combinations that give clean results
                const decimalPairs = [
                    [0.5, 0.2], [0.5, 0.4], [0.5, 0.6], [0.5, 0.8],
                    [0.2, 0.5], [0.4, 0.5], [0.25, 0.4], [0.25, 0.8],
                    [0.1, 0.3], [0.1, 0.7], [0.1, 0.9], [0.2, 0.4]
                ];
                const decimalPair = decimalPairs[this._getRandomInt(0, decimalPairs.length - 1)];
                a = decimalPair[0];
                b = decimalPair[1];
                expression = `${a} ${this.symbol} ${b}`;
                break;

            case 5: // Multiply with combined operations (e.g., 50 × 7 + 24)
                // For simplicity in the UI, we'll stick with just multiplication
                // but make it more challenging
                const twoDigitPairs = [
                    [30, 15], [30, 25], [40, 15], [40, 25],
                    [60, 15], [60, 25], [80, 15], [80, 25],
                    [35, 12], [45, 12], [55, 12], [65, 12]
                ];
                const twoDigitPair = twoDigitPairs[this._getRandomInt(0, twoDigitPairs.length - 1)];
                a = twoDigitPair[0];
                b = twoDigitPair[1];
                expression = `${a} ${this.symbol} ${b}`;
                // Create a shorter version for display constraints
                expression_short = `${a}×${b}`;
                break;
        }

        this.problemDetails = {
            expression: expression,
            expression_short: expression_short,
            answer: a * b,
            operands: [a, b]
        };
    }
}