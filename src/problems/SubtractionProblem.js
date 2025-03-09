import ProblemType from './ProblemType.js';

/**
 * Subtraction problem type
 * @extends ProblemType
 */
export default class SubtractionProblem extends ProblemType {
    /**
     * Create a new subtraction problem type
     */
    constructor() {
        super('subtraction');
        this.symbol = '-';
    }

    /**
     * Generate a subtraction problem based on difficulty parameters
     * @param {Object} params - Parameters defining difficulty
     * @param {number} params.minValue - Minimum value for operands
     * @param {number} params.maxValue - Maximum value for operands
     * @param {boolean} params.ensurePositiveResult - Whether to ensure positive results
     * @returns {Object} Problem with expression and answer
     */
    generate(params) {
        let a, b;

        if (params.ensurePositiveResult) {
            // Ensure a ≥ b for positive results
            b = this._getRandomInt(params.minValue, params.maxValue);
            const minA = params.ensurePositiveResult ? b : params.minValue;
            a = this._getRandomInt(minA, params.maxValue);
        } else {
            a = this._getRandomInt(params.minValue, params.maxValue);
            b = this._getRandomInt(params.minValue, params.maxValue);
        }

        return {
            expression: `${a} ${this.symbol} ${b}`,
            answer: a - b,
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