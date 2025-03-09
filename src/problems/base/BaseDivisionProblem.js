import BaseMathProblem from './BaseMathProblem.js';

/**
 * Base class for all division problems
 * @extends BaseMathProblem
 */
export default class BaseDivisionProblem extends BaseMathProblem {
    /**
     * Create a new division problem
     * @param {Object} difficultyLevel - The difficulty level
     */
    constructor(difficultyLevel) {
        super(difficultyLevel);
        this.type = 'division';
        this.symbol = '÷';
    }

    /**
     * Generate a division problem - to be implemented by subclasses
     */
    generate() {
        throw new Error('BaseDivisionProblem.generate() must be implemented by subclasses');
    }

    /**
     * Format the expression for display
     * @param {number} a - First operand (dividend)
     * @param {number} b - Second operand (divisor)
     * @returns {string} Formatted expression
     */
    formatExpression(a, b) {
        return `${a} ${this.symbol} ${b}`;
    }
}