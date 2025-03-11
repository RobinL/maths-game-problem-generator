import BaseMathProblem from './BaseMathProblem.js';

/**
 * Base class for all subtraction problems
 * @extends BaseMathProblem
 */
export default class BaseSubtractionProblem extends BaseMathProblem {
    /**
     * Create a new subtraction problem
     * @param {Object} difficultyLevel - The difficulty level
     */
    constructor(difficultyLevel) {
        super(difficultyLevel);
        this.type = 'subtraction';
        this.symbol = '-';
    }

    /**
     * Generate a subtraction problem - to be implemented by subclasses
     */
    generate() {
        throw new Error('BaseSubtractionProblem.generate() must be implemented by subclasses');
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