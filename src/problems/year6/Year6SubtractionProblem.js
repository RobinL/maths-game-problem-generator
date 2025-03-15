import BaseSubtractionProblem from '../base/BaseSubtractionProblem.js';
import { DIFFICULTY_LEVELS } from '../../difficulty/DifficultyLevel.js';

/**
 * Subtraction problem for Year 6
 * @extends BaseSubtractionProblem
 */
export default class Year6SubtractionProblem extends BaseSubtractionProblem {

    constructor() {
        super(DIFFICULTY_LEVELS.year6);
        this.generate()
    }

    generate() {
        // Year 6 students perform mental subtraction on large numbers and decimals
        // They use multi-step strategies, like subtracting a near round number and adjusting
        // They handle mixed operations mentally and find differences with decimals
        // Estimation is used to gauge whether answers are reasonable

        // Randomly choose between different types of Year 6 subtraction problems
        const problemType = this._getRandomInt(1, 5);

        let a, b, expression, expression_short;

        switch (problemType) {
            case 1: // Subtract from 10,000 (e.g., 10,000 - 4,500 = 5,500)
                a = 10000;
                b = this._getRandomInt(1, 9) * 1000 + this._getRandomInt(0, 9) * 100;
                // Make some problems require borrowing
                if (this._getRandomInt(0, 1) === 1) {
                    b += this._getRandomInt(1, 9) * 10 + this._getRandomInt(1, 9);
                }
                expression = `${a} - ${b}`;
                // Create a shorter version for display constraints
                expression_short = `${a}-${b}`;
                break;

            case 2: // Subtract decimals (e.g., 5 - 1.4 = 3.6)
                a = this._getRandomInt(5, 15);
                b = this._getRandomInt(1, a - 1) + this._getRandomDecimal(0.01, 0.99, 2);
                // Round to avoid floating point issues
                b = Math.round(b * 100) / 100;
                expression = `${a} - ${b}`;
                break;

            case 3: // Using compensation strategy (e.g., 1455 - 999 = 456)
                // Create a number to subtract that's close to a round number
                const baseNumber = this._getRandomInt(1, 9) * 1000 - this._getRandomInt(1, 9);
                b = baseNumber; // e.g., 999, 1999, 2999, etc.
                a = b + this._getRandomInt(100, 999);
                expression = `${a} - ${b}`;
                // Create a shorter version for display constraints
                expression_short = `${a}-${b}`;
                break;

            case 4: // Subtract mixed decimals (e.g., 13.5 - 2.7 = 10.8)
                a = this._getRandomInt(10, 20) + this._getRandomDecimal(0.1, 0.9, 1);
                b = this._getRandomInt(1, 5) + this._getRandomDecimal(0.01, 0.99, 2);
                // Round to avoid floating point issues
                a = Math.round(a * 100) / 100;
                b = Math.round(b * 100) / 100;
                expression = `${a} - ${b}`;
                break;

            case 5: // Subtract a near round number and adjust (e.g., 8000 - 4997 = 3003)
                a = this._getRandomInt(5, 15) * 1000;
                // Create a number just below a thousand
                b = this._getRandomInt(1, a / 1000 - 1) * 1000 - this._getRandomInt(1, 9);
                expression = `${a} - ${b}`;
                // Create a shorter version for display constraints
                expression_short = `${a}-${b}`;
                break;
        }

        this.problemDetails = {
            expression: expression,
            expression_short: expression_short,
            answer: a - b,
            operands: [a, b]
        };
    }
}