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

    /**
     * Get the short version of the problem expression with forward slash
     * @returns {string} The short formatted expression
     */
    get expression_short() {
        // First get the standard expression_short from BaseMathProblem
        let shortExpr = super.expression_short;

        // Replace division symbol with forward slash for more compact display
        return shortExpr.replace(this.symbol, '/');
    }
}