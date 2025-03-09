import BaseAdditionProblem from '../base/BaseAdditionProblem.js';
import { DIFFICULTY_LEVELS } from '../../difficulty/DifficultyLevel.js';

/**
 * Addition problem for Reception year
 * @extends BaseAdditionProblem
 */
export default class ReceptionAdditionProblem extends BaseAdditionProblem {
    /**
     * Create a new Reception addition problem
     */
    constructor() {
        super(DIFFICULTY_LEVELS.reception);
    }

    /**
     * Generate a Reception-level addition problem
     * Simple sums with numbers up to 5, ensuring sums don't exceed 10
     */
    generate() {
        // Reception addition: minValue=1, maxValue=5, maxSum=10
        const minValue = 1;
        const maxValue = 5;
        const maxSum = 10;

        // Generate first operand
        const a = this._getRandomInt(minValue, maxValue);

        // Generate second operand ensuring sum doesn't exceed maxSum
        const b = this._getRandomInt(minValue, Math.min(maxValue, maxSum - a));

        // Create the problem details with a directly formatted expression
        this.problemDetails = {
            expression: `${a} + ${b}`,
            answer: a + b,
            operands: [a, b]
        };
    }
}