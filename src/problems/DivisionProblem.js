import ProblemType from './ProblemType.js';

/**
 * Division problem type
 * @extends ProblemType
 */
export default class DivisionProblem extends ProblemType {
    /**
     * Create a new division problem type
     */
    constructor() {
        super('division');
        this.symbol = '/';
    }

    /**
     * Generate a division problem based on difficulty parameters
     * @param {Object} params - Parameters defining difficulty
     * @param {number} params.minDivisor - Minimum value for divisor
     * @param {number} params.maxDivisor - Maximum value for divisor
     * @param {number} params.minResult - Minimum value for result
     * @param {number} params.maxResult - Maximum value for result
     * @param {boolean} params.allowRemainder - Whether to allow division with remainders
     * @returns {Object} Problem with expression and answer
     */
    generate(params) {
        // For division, we work backwards to ensure clean division if needed
        const divisor = this._getRandomInt(params.minDivisor || 2, params.maxDivisor || 10);
        const result = this._getRandomInt(params.minResult || 1, params.maxResult || 10);

        let dividend;

        if (!params.allowRemainder) {
            // For clean division (no remainder)
            dividend = divisor * result;
        } else {
            // If remainders are allowed, we can be more flexible
            const minDividend = divisor * (params.minResult || 1);
            const maxDividend = divisor * (params.maxResult || 10) + (divisor - 1);
            dividend = this._getRandomInt(minDividend, maxDividend);
        }

        return {
            expression: `${dividend} ${this.symbol} ${divisor}`,
            // If remainders are allowed, we might want to return the full answer
            answer: params.allowRemainder ? dividend / divisor : result,
            operands: [dividend, divisor]
        };
    }

    /**
     * Generate a random integer between min and max (inclusive)
     * @param {number} min - Minimum value
     * @param {number} max - Maximum value
     * @returns {number} Random integer
     * @private
     */
    _getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}