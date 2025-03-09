import BaseMathProblem from './BaseMathProblem.js';

/**
 * Base class for all squared problems
 * @extends BaseMathProblem
 */
export default class BaseSquaredProblem extends BaseMathProblem {
    /**
     * Create a new squared problem
     * @param {Object} difficultyLevel - The difficulty level
     */
    constructor(difficultyLevel) {
        super(difficultyLevel);
        this.type = 'squared';
        this.symbol = '²';
    }

    /**
     * Generate a squared problem - to be implemented by subclasses
     */
    generate() {
        throw new Error('BaseSquaredProblem.generate() must be implemented by subclasses');
    }

    /**
     * Format the expression for display
     * @param {number} a - The number to be squared
     * @returns {string} Formatted expression
     */
    formatExpression(a) {
        return `${a}${this.symbol}`;
    }
}