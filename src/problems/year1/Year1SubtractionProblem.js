import BaseSubtractionProblem from '../base/BaseSubtractionProblem.js';
import { DIFFICULTY_LEVELS } from '../../difficulty/DifficultyLevel.js';

/**
 * Subtraction problem for Year 1
 * @extends BaseSubtractionProblem
 */
export default class Year1SubtractionProblem extends BaseSubtractionProblem {
    constructor() {
        super(DIFFICULTY_LEVELS.year1);
        this.generate()
    }

    generate() {
        // In Year 1, children subtract numbers within 20 mentally
        // They use knowledge of number bonds and count back in ones

        // Randomly choose between different types of Year 1 subtraction problems
        const problemType = this._getRandomInt(1, 3);

        let a, b, expression;
        let expression_short = null;

        switch (problemType) {
            case 1: // Simple subtraction of two single-digit numbers
                b = this._getRandomInt(1, 8);
                a = this._getRandomInt(b + 1, 9);
                expression = `${a} - ${b}`;
                break;

            case 2: // Subtraction from 10 or teen numbers
                a = this._getRandomInt(10, 18);
                b = this._getRandomInt(1, 9);
                expression = `${a} - ${b}`;
                break;

            case 3: // Subtraction related to number bonds (e.g., 10 - 3 = 7)
                a = 10;
                b = this._getRandomInt(1, 9);
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