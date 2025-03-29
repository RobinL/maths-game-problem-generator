import BaseAdditionProblem from '../base/BaseAdditionProblem.js';
import { DIFFICULTY_LEVELS } from '../../difficulty/DifficultyLevel.js';

/**
 * Addition problem for Year 4
 * @extends BaseAdditionProblem
 */
export default class Year4AdditionProblem extends BaseAdditionProblem {
    constructor() {
        super(DIFFICULTY_LEVELS.year4);
        this.generate()
    }

    generate() {
        // In Year 4, children handle mental addition of larger numbers and simple decimals
        // They should know number pairs that total 100 reliably (e.g., 37 + 63)
        // They use that to calculate complements to 1000 (e.g., 370 + 630 = 1000)
        // They also begin to work with tenths in mental math (e.g., 0.4 + 0.6 = 1.0)
        // They can mentally add multiples of 1, 10, or 100 to four-digit numbers

        // Randomly choose between different types of Year 4 addition problems
        const problemType = this._getRandomInt(1, 6);

        let a, b, expression;
        let expression_short = null;

        switch (problemType) {
            case 1: // Number bonds to 100 (e.g., 45 + 55 = 100)
                a = this._getRandomInt(15, 85);
                b = 100 - a;
                // Avoid trivial problems like adding 0 or 100
                if (b < 10) {
                    a -= 10;
                    b += 10;
                } else if (b > 90) {
                    a += 10;
                    b -= 10;
                }
                expression = `${a} + ${b}`;
                break;

            case 2: // Number bonds to 1000 using hundreds (e.g., 600 + 400 = 1000)
                a = this._getRandomInt(1, 9) * 100;
                b = 1000 - a;
                // Avoid trivial problems
                if (a === 100 || a === 900) {
                    a = 200 + this._getRandomInt(1, 5) * 100;
                    b = 1000 - a;
                }
                expression = `${a} + ${b}`;
                break;

            case 3: // Adding decimals to make a whole (e.g., 0.7 + 0.3 = 1.0)
                a = this._getRandomInt(1, 9) / 10;
                b = 1.0 - a;
                expression = `${a} + ${b}`;
                break;

            case 4: // Adding a multiple of 10 to a three-digit number (e.g., 345 + 50)
                a = this._getRandomInt(100, 900);
                b = this._getRandomInt(2, 9) * 10;
                // Avoid problems that just make a round hundred
                if ((a + b) % 100 === 0) {
                    b += 10;
                }
                expression = `${a} + ${b}`;
                break;

            case 5: // Adding a two-digit number to a two-digit number (e.g., 47 + 36)
                a = this._getRandomInt(25, 75);
                b = this._getRandomInt(25, 75);
                // Ensure we get a mix of problems that do and don't cross 100
                if (this._getRandomInt(0, 1) === 1 && a + b < 100) {
                    // Adjust to cross 100
                    a += (100 - (a + b)) + this._getRandomInt(1, 10);
                }
                expression = `${a} + ${b}`;
                break;

            case 6: // Adding multiples of 1, 10, or 100 to four-digit numbers (e.g., 3456 + 30)
                a = this._getRandomInt(1000, 9999);

                // Randomly decide whether to add ones, tens, or hundreds
                const additionType = this._getRandomInt(1, 3);

                if (additionType === 1) { // Add ones
                    b = this._getRandomInt(1, 9);
                } else if (additionType === 2) { // Add tens
                    b = this._getRandomInt(1, 9) * 10;
                } else { // Add hundreds
                    b = this._getRandomInt(1, 9) * 100;
                }

                expression = `${a} + ${b}`;
                break;
        }

        // Assign problemDetails after the switch, ensuring it always happens
        this.problemDetails = {
            expression: expression,
            // Conditionally add expression_short only if it was set
            ...(expression_short && { expression_short: expression_short }),
            answer: a + b,
            operands: [a, b]
        };
    }
}