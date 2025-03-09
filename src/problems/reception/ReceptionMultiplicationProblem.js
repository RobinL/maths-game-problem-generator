import BaseMultiplicationProblem from '../base/BaseMultiplicationProblem.js';
import { DIFFICULTY_LEVELS } from '../../difficulty/DifficultyLevel.js';

/**
 * Multiplication problem for Reception year (presented as doubling)
 * @extends BaseMultiplicationProblem
 */
export default class ReceptionMultiplicationProblem extends BaseMultiplicationProblem {

    constructor() {
        super(DIFFICULTY_LEVELS.reception);

        this.symbol = '×';
    }


    generate() {

        const minValue = 2;
        const maxValue = 5;


        const a = this._getRandomInt(minValue, maxValue);
        const b = 2;


        this.problemDetails = {
            // Format as "Double X" instead of "X × 2"
            expression: `Double ${a}`,
            answer: a * b,
            operands: [a, b]
        };
    }
}