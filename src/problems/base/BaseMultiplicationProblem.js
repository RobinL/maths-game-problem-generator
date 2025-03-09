import BaseMathProblem from './BaseMathProblem.js';

/**
 * Base class for all multiplication problems
 * @extends BaseMathProblem
 */
export default class BaseMultiplicationProblem extends BaseMathProblem {
    /**
     * Create a new multiplication problem
     * @param {Object} difficultyLevel - The difficulty level
     */
    constructor(difficultyLevel) {
        super(difficultyLevel);
        this.type = 'multiplication';
        this.symbol = '×';
    }

    /**
     * Generate a multiplication problem - to be implemented by subclasses
     */
    generate() {
        throw new Error('BaseMultiplicationProblem.generate() must be implemented by subclasses');
    }

    /**
     * Format the expression for display
     * @param {number} a - First operand
     * @param {number} b - Second operand
     * @returns {string} Formatted expression
     */
    formatExpression(a, b) {
        return `${a} ${this.symbol} ${b}`;
    }
}