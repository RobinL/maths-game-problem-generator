import BaseSubtractionProblem from '../base/BaseSubtractionProblem.js';
import { DIFFICULTY_LEVELS } from '../../difficulty/DifficultyLevel.js';

/**
 * Subtraction problem for Reception year
 * @extends BaseSubtractionProblem
 */
export default class ReceptionSubtractionProblem extends BaseSubtractionProblem {

    constructor() {
        super(DIFFICULTY_LEVELS.reception);
    }


    generate() {
        const minValue = 1;
        const maxValue = 5;

        const a = this._getRandomInt(minValue, maxValue);

        const b = this._getRandomInt(minValue, a);

        this.problemDetails = {
            expression: `${a} - ${b}`,
            answer: a - b,
            operands: [a, b]
        };
    }
}