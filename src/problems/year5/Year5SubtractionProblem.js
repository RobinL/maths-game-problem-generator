import BaseSubtractionProblem from '../base/BaseSubtractionProblem.js';
import { DIFFICULTY_LEVELS } from '../../difficulty/DifficultyLevel.js';

/**
 * Subtraction problem for Year 5
 * @extends BaseSubtractionProblem
 */
export default class Year5SubtractionProblem extends BaseSubtractionProblem {
    constructor() {
        super(DIFFICULTY_LEVELS.year5);
        this.generate()
    }

    generate() {
        // In Year 5, students subtract large numbers and decimals in their heads
        // They might do this by rounding and compensating (e.g., 12,462 - 2,300 = 10,162)
        // They find differences involving thousands (like 15,000 - 6,500)
        // They subtract decimals (like 5.0 - 1.3 = 3.7) mentally
        // They are encouraged to estimate and then adjust, using inverse operations to check

        // Randomly choose between different types of Year 5 subtraction problems
        const problemType = this._getRandomInt(1, 6);

        let a, b, expression;
        let expression_short = null;

        switch (problemType) {
            case 1: // Subtract from 10,000 (e.g., 10,000 - 2,500 = 7,500)
                a = 10000;
                b = this._getRandomInt(1, 9) * 1000 + this._getRandomInt(1, 9) * 100;
                // Avoid trivial problems
                if (b % 1000 === 0) {
                    b += this._getRandomInt(1, 9) * 100;
                }
                expression = `${a} - ${b}`;
                // Create a shorter version for display constraints
                expression_short = `${a}-${b}`;
                break;

            case 2: // Subtract decimals (e.g., 5 - 2.8 = 2.2)
                a = this._getRandomInt(3, 10);
                b = this._getRandomInt(1, a - 1) + this._getRandomDecimal(0.1, 0.9, 1);
                expression = `${a} - ${b}`;
                break;

            case 3: // Subtract thousands from thousands (e.g., 12,462 - 2,300 = 10,162)
                a = this._getRandomInt(10000, 19999);
                b = this._getRandomInt(1, 9) * 1000 + this._getRandomInt(1, 9) * 100;
                expression = `${a} - ${b}`;
                // Create a shorter version for display constraints
                expression_short = `${a}-${b}`;
                break;

            case 4: // Subtract from a whole number to get a decimal (e.g., 7 - 4.3 = 2.7)
                a = this._getRandomInt(5, 10);
                b = this._getRandomInt(1, a - 1) + this._getRandomDecimal(0.1, 0.9, 1);
                expression = `${a} - ${b}`;
                break;

            case 5: // Subtract a four-digit number from another (e.g., 8,500 - 3,700 = 4,800)
                a = this._getRandomInt(5000, 9999);
                b = this._getRandomInt(1000, a - 1000);
                // Make the problem more suitable for mental calculation by using round hundreds
                a = Math.round(a / 100) * 100;
                b = Math.round(b / 100) * 100;
                expression = `${a} - ${b}`;
                // Create a shorter version for display constraints
                expression_short = `${a}-${b}`;
                break;

            case 6: // Decimal minus decimal (e.g., 5.7 - 3.3 = 2.4)
                // Generate 'a' with one decimal place
                a = this._getRandomInt(3, 15) + this._getRandomDecimal(0.1, 0.9, 1);
                a = parseFloat(a.toFixed(1)); // Ensure precision

                // Generate 'b' smaller than 'a', also with one decimal place
                // Ensure b is at least 1.0 smaller than a
                const maxBInt = Math.floor(a) - 1;
                if (maxBInt < 1) { // Handle cases where a is small
                    a += 2.0; // Adjust a upwards if needed
                }
                b = this._getRandomInt(1, Math.max(1, maxBInt)) + this._getRandomDecimal(0.1, 0.9, 1);
                b = parseFloat(b.toFixed(1)); // Ensure precision

                // Ensure a > b, regenerate b if needed (rare)
                if (b >= a) {
                    b = this._getRandomInt(1, Math.max(1, Math.floor(a) - 1)) + this._getRandomDecimal(0.1, 0.9, 1);
                    b = parseFloat(b.toFixed(1));
                }

                expression = `${a} - ${b}`;
                expression_short = `${a}-${b}`;
                break;
        }

        // Assign problemDetails after the switch, ensuring it always happens
        this.problemDetails = {
            expression: expression,
            // Conditionally add expression_short only if it was set
            ...(expression_short && { expression_short: expression_short }),
            answer: a - b,
            operands: [a, b]
        };
    }
}