import BaseSubtractionProblem from '../base/BaseSubtractionProblem.js';
import { DIFFICULTY_LEVELS } from '../../difficulty/DifficultyLevel.js';

/**
 * Subtraction problem for Year 4
 * @extends BaseSubtractionProblem
 */
export default class Year4SubtractionProblem extends BaseSubtractionProblem {
    constructor() {
        super(DIFFICULTY_LEVELS.year4);
        this.generate()
    }

    generate() {
        // In Year 4, children can mentally subtract multiples of 1, 10, or 100 from four-digit numbers
        // They use their knowledge of complements to 100/1000 in reverse (e.g. 100 − 45 = 55)
        // They also handle simple decimal subtractions (e.g. 1.0 − 0.4 = 0.6)
        // Rounding skills help them estimate and adjust when subtracting awkward numbers

        // Randomly choose between different types of Year 4 subtraction problems
        const problemType = this._getRandomInt(1, 6);

        let a, b, expression;
        let expression_short = null;

        switch (problemType) {
            case 1: // Complements to 100 (e.g., 100 - 45 = 55)
                a = 100;
                b = this._getRandomInt(15, 85);
                // Avoid trivial problems
                if (b < 10 || b > 90) {
                    b = 50;
                }
                expression = `${a} - ${b}`;
                break;

            case 2: // Subtract multiples of 10 from three-digit numbers (e.g., 750 - 50 = 700)
                a = this._getRandomInt(200, 990);
                b = this._getRandomInt(2, 9) * 10;
                // Avoid problems that just change to a round hundred
                if ((a - b) % 100 === 0 && (a % 100) !== 0) {
                    b += 10;
                }
                expression = `${a} - ${b}`;
                break;

            case 3: // Decimal subtraction (e.g., 2.0 - 0.5 = 1.5)
                a = this._getRandomInt(1, 5) + 0.0; // Ensure it's a whole number as a decimal
                b = this._getRandomInt(1, 9) / 10;
                expression = `${a} - ${b}`;
                break;

            case 4: // Subtract from 1000 (e.g., 1000 - 350 = 650)
                a = 1000;
                b = this._getRandomInt(1, 9) * 100 + this._getRandomInt(1, 9) * 10;
                // Avoid trivial problems
                if (b < 100 || b > 900) {
                    b = 500 + this._getRandomInt(-2, 2) * 100;
                }
                expression = `${a} - ${b}`;
                break;

            case 5: // Subtract a two-digit number from a three-digit number (e.g., 325 - 47)
                a = this._getRandomInt(100, 500);
                b = this._getRandomInt(11, 99);
                // Ensure we don't have a trivial subtraction of ones
                if (b % 10 === 0) {
                    b += this._getRandomInt(1, 9);
                }
                // Avoid problems where the ones digit of a is larger than ones digit of b
                // to ensure some borrowing is needed
                if ((a % 10) > (b % 10)) {
                    a -= (a % 10) - (b % 10) + 1;
                }
                expression = `${a} - ${b}`;
                break;

            case 6: // Subtract multiples of 1, 10, or 100 from four-digit numbers (e.g., 4821 - 200)
                a = this._getRandomInt(1000, 9999);

                // Randomly decide whether to subtract ones, tens, or hundreds
                const subtractionType = this._getRandomInt(1, 3);

                if (subtractionType === 1) { // Subtract ones
                    b = this._getRandomInt(1, 9);
                } else if (subtractionType === 2) { // Subtract tens
                    b = this._getRandomInt(1, 9) * 10;
                } else { // Subtract hundreds
                    b = this._getRandomInt(1, 9) * 100;
                }

                expression = `${a} - ${b}`;
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