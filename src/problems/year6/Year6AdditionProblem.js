import BaseAdditionProblem from '../base/BaseAdditionProblem.js';
import { DIFFICULTY_LEVELS } from '../../difficulty/DifficultyLevel.js';

/**
 * Addition problem for Year 6
 * @extends BaseAdditionProblem
 */
export default class Year6AdditionProblem extends BaseAdditionProblem {

    constructor() {
        super(DIFFICULTY_LEVELS.year6);
        this.generate()
    }

    generate() {
        // By Year 6, children are fluent in mental addition with large numbers and decimals
        // They can confidently add numbers in the thousands or more by breaking calculations into parts
        // They also add decimal numbers of varying lengths mentally, such as adding tenths and hundredths
        // They use efficient methods like compensating, partitioning, or using known sums

        // Randomly choose between different types of Year 6 addition problems
        const problemType = this._getRandomInt(1, 5);

        let a, b, expression, expression_short;

        switch (problemType) {
            case 1: // Adding large numbers (e.g., 7,500 + 2,500 = 10,000)
                a = this._getRandomInt(1, 9) * 1000 + this._getRandomInt(0, 9) * 100 + this._getRandomInt(0, 9) * 10;
                b = this._getRandomInt(1, 9) * 1000 + this._getRandomInt(0, 9) * 100 + this._getRandomInt(0, 9) * 10;
                // Make some problems that sum to nice round numbers
                if (this._getRandomInt(0, 1) === 1) {
                    const target = this._getRandomInt(1, 2) * 10000;
                    a = this._getRandomInt(3000, target - 3000);
                    b = target - a;
                }
                expression = `${a} + ${b}`;
                // Create a shorter version for display constraints
                expression_short = `${a}+${b}`;
                break;

            case 2: // Adding decimals with different decimal places (e.g., 4.8 + 3.4 = 8.2)
                a = this._getRandomInt(1, 9) + this._getRandomDecimal(0.1, 0.9, 1);
                b = this._getRandomInt(1, 9) + this._getRandomDecimal(0.01, 0.99, 2);
                // Round to avoid floating point issues
                a = Math.round(a * 100) / 100;
                b = Math.round(b * 100) / 100;
                expression = `${a} + ${b}`;
                break;

            case 3: // Using compensation strategy (e.g., 999 + 456 = 1,455)
                // Create a number close to a round number for compensation strategy
                const baseNumber = this._getRandomInt(1, 9) * 1000 - this._getRandomInt(1, 9);
                a = baseNumber; // e.g., 999, 1999, 2999, etc.
                b = this._getRandomInt(100, 999);
                expression = `${a} + ${b}`;
                // Create a shorter version for display constraints
                expression_short = `${a}+${b}`;
                break;

            case 4: // Adding mixed decimals (e.g., 5.75 + 2.25 = 8)
                // Create decimals that sum to a whole number or nice decimal
                const wholeTarget = this._getRandomInt(5, 15);
                a = this._getRandomInt(1, wholeTarget - 1) + this._getRandomDecimal(0.01, 0.99, 2);
                // Round to avoid floating point issues
                a = Math.round(a * 100) / 100;
                b = wholeTarget - a;
                // Round to avoid floating point issues
                b = Math.round(b * 100) / 100;
                expression = `${a} + ${b}`;
                break;

            case 5: // Adding multiple numbers (e.g., 25 + 30 + 45 = 100)
                // For simplicity in the UI, we'll stick with two numbers but make them more complex
                a = this._getRandomInt(100, 999);
                b = this._getRandomInt(1000, 9999);
                // Make some problems that require carrying across multiple places
                if (this._getRandomInt(0, 1) === 1) {
                    a = a - (a % 10) + 9; // Make last digit 9 to force carrying
                    b = b - (b % 10) + 8; // Make last digit 8 to force carrying
                }
                expression = `${a} + ${b}`;
                // Create a shorter version for display constraints
                expression_short = `${a}+${b}`;
                break;
        }

        this.problemDetails = {
            expression: expression,
            expression_short: expression_short,
            answer: a + b,
            operands: [a, b]
        };
    }
}