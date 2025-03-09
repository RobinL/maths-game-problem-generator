import BaseMathProblem from './BaseMathProblem.js';

/**
 * Base class for all addition problems
 * @extends BaseMathProblem
 */
export default class BaseAdditionProblem extends BaseMathProblem {
    /**
     * Create a new addition problem
     * @param {Object} difficultyLevel - The difficulty level
     */
    constructor(difficultyLevel) {
        super(difficultyLevel);
        this.type = 'addition';
        this.symbol = '+';
    }

    /**
     * Generate an addition problem - to be implemented by subclasses
     */
    generate() {
        throw new Error('BaseAdditionProblem.generate() must be implemented by subclasses');
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