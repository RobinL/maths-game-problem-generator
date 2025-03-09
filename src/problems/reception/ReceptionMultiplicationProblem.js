import BaseMultiplicationProblem from '../base/BaseMultiplicationProblem.js';
import { DIFFICULTY_LEVELS } from '../../difficulty/DifficultyLevel.js';

/**
 * Multiplication problem for Reception year (presented as doubling)
 * @extends BaseMultiplicationProblem
 */
export default class ReceptionMultiplicationProblem extends BaseMultiplicationProblem {
    /**
     * Create a new Reception multiplication problem
     */
    constructor() {
        super(DIFFICULTY_LEVELS.reception);
        // Override the symbol to indicate this is doubling
        this.symbol = '×';
    }

    /**
     * Generate a Reception-level multiplication problem
     * Simple doubling with numbers 2-5 (presented as "Double X")
     */
    generate() {
        // Reception multiplication: minValue=2, maxValue=5, isDoubling=true
        const minValue = 2;
        const maxValue = 5;

        // For Reception, we only do doubling (multiplying by 2)
        const a = this._getRandomInt(minValue, maxValue);
        const b = 2; // Always doubling

        // Create the problem details
        this.problemDetails = {
            // Format as "Double X" instead of "X × 2"
            expression: `Double ${a}`,
            answer: a * b,
            operands: [a, b]
        };
    }
}