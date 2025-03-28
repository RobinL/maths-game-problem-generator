import BaseAdditionProblem from '../base/BaseAdditionProblem.js';
import { DIFFICULTY_LEVELS } from '../../difficulty/DifficultyLevel.js';

/**
 * Addition problem for Year 5
 * @extends BaseAdditionProblem
 */
export default class Year5AdditionProblem extends BaseAdditionProblem {
    constructor() {
        super(DIFFICULTY_LEVELS.year5);
        this.generate()
    }

    generate() {
        // In Year 5, children work with larger integers and decimals in mental calculations
        // They practice adding numbers with four or more digits by using place value knowledge
        // They also add decimals mentally, especially one- or two-decimal-place numbers that sum to whole numbers
        // The difficulty level includes combining numbers like 10,000 + 2,500 or 5.7 + 3.3 mentally

        // Randomly choose between different types of Year 5 addition problems
        const problemType = this._getRandomInt(1, 5);

        let a, b, expression;
        let expression_short = null;

        switch (problemType) {
            case 1: // Adding large numbers (e.g., 2,500 + 4,700 = 7,200)
                a = this._getRandomInt(1, 9) * 1000 + this._getRandomInt(1, 9) * 100;
                b = this._getRandomInt(1, 9) * 1000 + this._getRandomInt(1, 9) * 100;
                // Avoid trivial problems
                if (a % 1000 === 0 || b % 1000 === 0) {
                    a += this._getRandomInt(1, 9) * 100;
                    b += this._getRandomInt(1, 9) * 100;
                }
                expression = `${a} + ${b}`;
                // Create a shorter version for display constraints
                expression_short = `${a}+${b}`;
                break;

            case 2: // Adding decimals to make a whole (e.g., 0.6 + 0.4 = 1.0)
                a = this._getRandomDecimal(0.1, 0.9, 1);
                b = 1.0 - a;
                expression = `${a} + ${b}`;
                break;

            case 3: // Adding decimals with two decimal places (e.g., 7.5 + 2.5 = 10.0)
                a = this._getRandomInt(1, 9) + this._getRandomDecimal(0.1, 0.9, 1);
                b = this._getRandomInt(1, 5) + (10 - a);
                // Ensure we get a nice round sum
                if (Math.abs(a + b - Math.round(a + b)) > 0.01) {
                    b = Math.round(a + b) - a;
                }
                expression = `${a} + ${b}`;
                break;

            case 4: // Adding to make 10,000 (e.g., 6,500 + 3,500 = 10,000)
                a = this._getRandomInt(1, 9) * 1000;
                b = 10000 - a;
                // Avoid trivial problems
                if (a === 1000 || a === 9000) {
                    a = this._getRandomInt(2, 8) * 1000;
                    b = 10000 - a;
                }
                // Add some complexity with hundreds
                if (this._getRandomInt(0, 1) === 1) {
                    const hundreds = this._getRandomInt(1, 9) * 100;
                    a += hundreds;
                    b -= hundreds;
                }
                expression = `${a} + ${b}`;
                // Create a shorter version for display constraints
                expression_short = `${a}+${b}`;
                break;

            case 5: // Adding a four-digit number to a three-digit number (e.g., 1,234 + 567)
                a = this._getRandomInt(1000, 9999);
                b = this._getRandomInt(100, 999);
                expression = `${a} + ${b}`;
                // Create a shorter version for display constraints
                expression_short = `${a}+${b}`;
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