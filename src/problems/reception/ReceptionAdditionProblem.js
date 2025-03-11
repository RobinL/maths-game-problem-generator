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

        const a = this._getRandomInt(minValue, maxValue);

        const b = this._getRandomInt(minValue, Math.min(maxValue, maxSum - a));

        this.problemDetails = {
            expression: `${a} + ${b}`,
            answer: a + b,
            operands: [a, b]
        };
    }
}