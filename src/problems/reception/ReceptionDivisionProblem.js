import BaseDivisionProblem from '../base/BaseDivisionProblem.js';
import { DIFFICULTY_LEVELS } from '../../difficulty/DifficultyLevel.js';

/**
 * Division problem for Reception year (presented as halving)
 * @extends BaseDivisionProblem
 */
export default class ReceptionDivisionProblem extends BaseDivisionProblem {
    /**
     * Create a new Reception division problem
     */
    constructor() {
        super(DIFFICULTY_LEVELS.reception);
        // Override the symbol to indicate this is halving
        this.symbol = '÷';
    }

    /**
     * Generate a Reception-level division problem
     * Simple halving with even numbers up to 10 (presented as "Half of X")
     */
    generate() {
        // Reception division: minDivisor=2, maxDivisor=2, minResult=1, maxResult=5, isHalving=true
        const minResult = 1;
        const maxResult = 5;
        const divisor = 2; // Always halving

        // Generate a result first
        const result = this._getRandomInt(minResult, maxResult);

        // Calculate the dividend (must be even)
        const dividend = result * divisor;

        // Create the problem details
        this.problemDetails = {
            // Format as "Half of X" instead of "X ÷ 2"
            expression: `Half of ${dividend}`,
            answer: result,
            operands: [dividend, divisor]
        };
    }
}