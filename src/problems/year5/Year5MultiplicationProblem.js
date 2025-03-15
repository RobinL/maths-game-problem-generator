import BaseMultiplicationProblem from '../base/BaseMultiplicationProblem.js';
import { DIFFICULTY_LEVELS } from '../../difficulty/DifficultyLevel.js';

/**
 * Multiplication problem for Year 5
 * @extends BaseMultiplicationProblem
 */
export default class Year5MultiplicationProblem extends BaseMultiplicationProblem {

    constructor() {
        super(DIFFICULTY_LEVELS.year5);
        this.symbol = '×';
        this.generate()
    }

    generate() {
        // By Year 5, children have all basic multiplication facts at their fingertips
        // They extend this knowledge to more complex mental multiplication
        // They should recognize and use square numbers and cube numbers (squares discussed separately)
        // They multiply and divide whole numbers and decimals by 10, 100, and 1,000 mentally
        // Mental strategies include using factors (e.g. to multiply by 25, multiply by 100 then divide by 4)

        // Randomly choose between different types of Year 5 multiplication problems
        const problemType = this._getRandomInt(1, 5);

        let a, b, expression, expression_short;

        switch (problemType) {
            case 1: // Multiply two-digit by one-digit (e.g., 15 × 6 = 90)
                a = this._getRandomInt(11, 25);
                b = this._getRandomInt(3, 9);
                expression = `${a} ${this.symbol} ${b}`;
                break;

            case 2: // Multiply by 25 using factors (e.g., 25 × 8 = 200)
                a = 25;
                b = this._getRandomInt(3, 12);
                expression = `${a} ${this.symbol} ${b}`;
                break;

            case 3: // Multiply decimals by 10, 100, 1000 (e.g., 3.2 × 10 = 32)
                a = this._getRandomInt(1, 9) + this._getRandomDecimal(0.1, 0.9, 1);
                b = [10, 100, 1000][this._getRandomInt(0, 2)];
                expression = `${a} ${this.symbol} ${b}`;
                break;

            case 4: // Multiply using factors (e.g., 16 × 5 = 80)
                // Choose numbers that can be factored easily for mental calculation
                const factorPairs = [
                    [12, 5], [14, 5], [16, 5], [18, 5],
                    [15, 6], [15, 8], [20, 6], [20, 7],
                    [24, 5], [25, 6], [25, 8], [30, 4]
                ];
                const pair = factorPairs[this._getRandomInt(0, factorPairs.length - 1)];
                a = pair[0];
                b = pair[1];
                expression = `${a} ${this.symbol} ${b}`;
                break;

            case 5: // Multiply two two-digit numbers (e.g., 20 × 15 = 300)
                // Focus on "friendly" combinations that are manageable mentally
                const twoDigitPairs = [
                    [20, 15], [20, 25], [20, 30], [20, 35],
                    [25, 20], [25, 30], [25, 40],
                    [30, 20], [30, 30], [40, 15], [50, 12]
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