import BaseAdditionProblem from '../base/BaseAdditionProblem.js';
import { DIFFICULTY_LEVELS } from '../../difficulty/DifficultyLevel.js';

/**
 * Addition problem for Year 3
 * @extends BaseAdditionProblem
 */
export default class Year3AdditionProblem extends BaseAdditionProblem {

    constructor() {
        super(DIFFICULTY_LEVELS.year3);
    }

    generate() {
        // In Year 3, mental addition skills advance to larger numbers
        // Children are expected to add numbers in the hundreds mentally
        // They continue to use place value strategies and number bonds
        // Two-digit additions that cross 100 are practiced

        // Randomly choose between different types of Year 3 addition problems
        const problemType = this._getRandomInt(1, 4);

        let a, b;

        switch (problemType) {
            case 1: // Add ones to a three-digit number (e.g., 234 + 5)
                a = this._getRandomInt(100, 900);
                b = this._getRandomInt(2, 9); // Avoid trivial +1 problems
                break;

            case 2: // Add tens to a three-digit number (e.g., 170 + 30)
                a = this._getRandomInt(100, 900);
                // Avoid problems that just change the hundreds digit
                const tensDigit = Math.floor((a % 100) / 10);
                b = this._getRandomInt(1, 9) * 10;
                // Ensure we're not just adding to make a round hundred
                if ((tensDigit + b / 10) % 10 === 0) {
                    b += 10;
                }
                break;

            case 3: // Add hundreds to a three-digit number (e.g., 325 + 300)
                a = this._getRandomInt(100, 600);
                // Ensure we don't exceed 999 in the result (staying within hundreds)
                const maxHundreds = Math.min(8, Math.floor((999 - a) / 100));
                b = this._getRandomInt(1, maxHundreds) * 100;

                // Avoid problems that just change the thousands digit
                if ((Math.floor(a / 100) + b / 100) % 10 === 0) {
                    // If this would make a round thousand, reduce by 100 if possible
                    if (b > 100) {
                        b -= 100;
                    } else {
                        // Otherwise adjust the first number
                        a += 50;
                    }
                }
                break;

            case 4: // Two-digit additions that cross 100 (e.g., 55 + 47)
                a = this._getRandomInt(50, 95);
                // Ensure the sum crosses 100
                b = this._getRandomInt(100 - a + 1, 30);
                break;
        }

        this.problemDetails = {
            expression: `${a} + ${b}`,
            answer: a + b,
            operands: [a, b]
        };
    }
}