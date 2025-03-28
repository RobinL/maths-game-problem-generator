import BaseSubtractionProblem from '../base/BaseSubtractionProblem.js';
import { DIFFICULTY_LEVELS } from '../../difficulty/DifficultyLevel.js';

/**
 * Subtraction problem for Reception year
 * @extends BaseSubtractionProblem
 */
export default class ReceptionSubtractionProblem extends BaseSubtractionProblem {
    constructor() {
        super(DIFFICULTY_LEVELS.reception);
        this.generate()
    }

    generate() {
        const minValue = 1;
        const maxValue = 5;

        let a, b, expression;
        let expression_short = null;

        a = this._getRandomInt(minValue, maxValue);
        b = this._getRandomInt(minValue, a);
        expression = `${a} - ${b}`;

        // Assign problemDetails ensuring it always happens
        this.problemDetails = {
            expression: expression,
            // Conditionally add expression_short only if it was set
            ...(expression_short && { expression_short: expression_short }),
            answer: a - b,
            operands: [a, b]
        };
    }
}