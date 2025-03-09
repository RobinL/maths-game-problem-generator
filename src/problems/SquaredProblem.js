import ProblemType from './ProblemType.js';

/**
 * Squared problem type (x²)
 * @extends ProblemType
 */
export default class SquaredProblem extends ProblemType {
    /**
     * Create a new squared problem type
     */
    constructor() {
        super('squared');
        this.symbol = '²';
    }

    /**
     * Generate a squared problem based on difficulty parameters
     * @param {Object} params - Parameters defining difficulty
     * @param {number} params.minValue - Minimum value for the base number
     * @param {number} params.maxValue - Maximum value for the base number
     * @returns {Object} Problem with expression and answer
     */
    generate(params) {
        const a = this._getRandomInt(params.minValue, params.maxValue);

        return {
            expression: `${a}${this.symbol}`,
            answer: a * a,
            operands: [a]
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