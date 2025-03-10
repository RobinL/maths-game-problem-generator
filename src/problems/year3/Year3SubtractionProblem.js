import BaseSubtractionProblem from '../base/BaseSubtractionProblem.js';
import { DIFFICULTY_LEVELS } from '../../difficulty/DifficultyLevel.js';

/**
 * Subtraction problem for Year 3
 * @extends BaseSubtractionProblem
 */
export default class Year3SubtractionProblem extends BaseSubtractionProblem {

    constructor() {
        super(DIFFICULTY_LEVELS.year3);
    }

    generate() {
        // In Year 3, children subtract in their heads with three-digit numbers minus ones, tens, or hundreds
        // They use estimation and inverse operations to check results
        // According to the National Curriculum, they should be able to mentally subtract ones, tens, or hundreds

        // Randomly choose between different types of Year 3 subtraction problems
        const problemType = this._getRandomInt(1, 4);

        let a, b;

        switch (problemType) {
            case 1: // Subtract ones from a three-digit number (e.g., 256 - 6)
                a = this._getRandomInt(100, 999);
                // Use the ones digit of 'a' to ensure we don't need to borrow
                const onesDigit = a % 10;
                if (onesDigit < 2) {
                    // If ones digit is 0 or 1, add a random number to make it larger
                    a += this._getRandomInt(2, 8);
                }
                b = this._getRandomInt(2, Math.min(9, a % 10));
                break;

            case 2: // Subtract tens from a three-digit number (e.g., 340 - 40)
                a = this._getRandomInt(100, 999);
                // Ensure the tens digit is large enough to subtract from
                const tensDigit = Math.floor((a % 100) / 10);
                if (tensDigit < 2) {
                    // If tens digit is 0 or 1, add a random number of tens to make it larger
                    a += this._getRandomInt(2, 8) * 10;
                }
                b = this._getRandomInt(1, Math.min(9, Math.floor((a % 100) / 10))) * 10;
                break;

            case 3: // Subtract hundreds from a three-digit number (e.g., 500 - 200)
                a = this._getRandomInt(300, 999);
                // Ensure the hundreds digit is large enough to subtract from
                const hundredsDigit = Math.floor(a / 100);
                b = this._getRandomInt(1, hundredsDigit - 1) * 100;
                break;

            case 4: // Simple subtraction from a multiple of 10 or 100 (e.g., 100 - 35)
                // Create a multiple of 10 or 100 as the minuend
                const baseType = this._getRandomInt(1, 2);
                if (baseType === 1) {
                    // Multiple of 100 (e.g., 100, 200, etc.)
                    a = this._getRandomInt(1, 9) * 100;
                    // Subtract a number less than 100
                    b = this._getRandomInt(10, 90);
                } else {
                    // Multiple of 10 (e.g., 50, 60, etc.)
                    a = this._getRandomInt(5, 20) * 10;
                    // Subtract a single-digit number
                    b = this._getRandomInt(2, 9);
                }
                break;
        }

        this.problemDetails = {
            expression: `${a} - ${b}`,
            answer: a - b,
            operands: [a, b]
        };
    }
}