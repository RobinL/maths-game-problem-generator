import BaseAdditionProblem from '../base/BaseAdditionProblem.js';
import { DIFFICULTY_LEVELS } from '../../difficulty/DifficultyLevel.js';

/**
 * Addition problem for Reception year
 * @extends BaseAdditionProblem
 */
export default class ReceptionAdditionProblem extends BaseAdditionProblem {
    constructor() {
        super(DIFFICULTY_LEVELS.reception);
        this.generate()
    }

    generate() {
        const minValue = 1;
        const maxValue = 5;
        const maxSum = 10;

        let a, b, expression;
        let expression_short = null;

        a = this._getRandomInt(minValue, maxValue);
        b = this._getRandomInt(minValue, Math.min(maxValue, maxSum - a));
        expression = `${a} + ${b}`;

        // Assign problemDetails ensuring it always happens
        this.problemDetails = {
            expression: expression,
            // Conditionally add expression_short only if it was set
            ...(expression_short && { expression_short: expression_short }),
            answer: a + b,
            operands: [a, b]
        };
    }
}