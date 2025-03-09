import ProblemType from './ProblemType.js';

/**
 * Multiplication problem type
 * @extends ProblemType
 */
export default class MultiplicationProblem extends ProblemType {
    /**
     * Create a new multiplication problem type
     */
    constructor() {
        super('multiplication');
        this.symbol = '×';
    }

    /**
     * Generate a multiplication problem based on difficulty parameters
     * @param {Object} params - Parameters defining difficulty
     * @param {number} params.minValue - Minimum value for operands
     * @param {number} params.maxValue - Maximum value for operands
     * @returns {Object} Problem with expression and answer
     */
    generate(params) {
        const a = this._getRandomInt(params.minValue, params.maxValue);
        const b = this._getRandomInt(params.minValue, params.maxValue);

        return {
            expression: `${a} ${this.symbol} ${b}`,
            answer: a * b,
            operands: [a, b]
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