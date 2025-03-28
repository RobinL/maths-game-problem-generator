import BaseSubtractionProblem from '../base/BaseSubtractionProblem.js';
import { DIFFICULTY_LEVELS } from '../../difficulty/DifficultyLevel.js';

/**
 * Subtraction problem for Year 2
 * @extends BaseSubtractionProblem
 */
export default class Year2SubtractionProblem extends BaseSubtractionProblem {
    constructor() {
        super(DIFFICULTY_LEVELS.year2);
        this.generate()
    }

    generate() {
        // In Year 2, children know subtraction facts within 20 and use them to derive others up to 100
        // They can mentally subtract a single-digit or a multiple of 10 from a two-digit number
        // They understand the inverse relationship with addition

        // Randomly choose between different types of Year 2 subtraction problems
        const problemType = this._getRandomInt(1, 4);

        let a, b, expression;
        let expression_short = null;

        switch (problemType) {
            case 1: // Subtraction facts within 20 (including bridging through 10)
                a = this._getRandomInt(11, 20);
                b = this._getRandomInt(3, a - 1);
                // Avoid trivial problems like subtracting 0
                if (b === 0) b = 1;
                expression = `${a} - ${b}`;
                break;

            case 2: // Subtracting a one-digit number from a two-digit number
                a = this._getRandomInt(20, 99);
                b = this._getRandomInt(1, 9);
                expression = `${a} - ${b}`;
                break;

            case 3: // Subtracting a multiple of 10 from a two-digit number
                a = this._getRandomInt(40, 99);
                b = this._getRandomInt(1, 3) * 10; // 10, 20, or 30
                expression = `${a} - ${b}`;
                break;

            case 4: // Derived facts using place value (e.g., if 10-7=3, then 100-70=30)
                const baseA = 10;
                const baseB = this._getRandomInt(1, 9);
                a = baseA * 10;
                b = baseB * 10;
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