import BaseSubtractionProblem from '../base/BaseSubtractionProblem.js';
import { DIFFICULTY_LEVELS } from '../../difficulty/DifficultyLevel.js';

/**
 * Subtraction problem for Reception year
 * @extends BaseSubtractionProblem
 */
export default class ReceptionSubtractionProblem extends BaseSubtractionProblem {
    /**
     * Create a new Reception subtraction problem
     */
    constructor() {
        super(DIFFICULTY_LEVELS.reception);
    }

    /**
     * Generate a Reception-level subtraction problem
     * Simple "taking away" with numbers up to 5, ensuring positive results
     */
    generate() {
        // Reception subtraction: minValue=1, maxValue=5, ensurePositiveResult=true
        const minValue = 1;
        const maxValue = 5;

        // Generate first operand (the number to subtract from)
        const a = this._getRandomInt(minValue, maxValue);

        // Generate second operand ensuring result is positive (b <= a)
        const b = this._getRandomInt(minValue, a);

        // Create the problem details with a directly formatted expression
        this.problemDetails = {
            expression: `${a} - ${b}`,
            answer: a - b,
            operands: [a, b]
        };
    }
}