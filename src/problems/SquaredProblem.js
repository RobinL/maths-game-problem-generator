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
     * @param {boolean} params.enabled - Whether squared problems are enabled for this difficulty level
     * @param {boolean} params.includeSquareAddition - Whether to include addition of squares (e.g., 5² + 3²)
     * @returns {Object} Problem with expression and answer
     */
    generate(params) {
        // If squared problems are disabled for this level, fall back to a simple multiplication
        if (params.enabled === false) {
            const a = this._getRandomInt(2, 5); // Avoid 1×1
            const b = a; // Same number for squaring

            return {
                expression: `${a} × ${b}`,
                answer: a * b,
                operands: [a, b]
            };
        }

        // Ensure minValue is at least 2 to avoid trivial 1² problems
        const effectiveMinValue = Math.max(params.minValue, 2);

        // Handle addition of squares (for Year 6)
        if (params.includeSquareAddition) {
            const a = this._getRandomInt(effectiveMinValue, params.maxValue);
            const b = this._getRandomInt(effectiveMinValue, params.maxValue);

            // For Year 6, include specific examples like 3² + 9²
            if (Math.random() < 0.3) {
                return {
                    expression: `3${this.symbol} + 9${this.symbol}`,
                    answer: 9 + 81,
                    operands: [3, 9]
                };
            }

            return {
                expression: `${a}${this.symbol} + ${b}${this.symbol}`,
                answer: (a * a) + (b * b),
                operands: [a, b]
            };
        }

        // For Year 4, focus on squares up to 5²
        // For Year 5 and 6, include squares up to 12²
        const a = this._getRandomInt(effectiveMinValue, params.maxValue);

        // For Year 5, include specific examples like 7²
        if (params.maxValue >= 7 && Math.random() < 0.3) {
            return {
                expression: `7${this.symbol}`,
                answer: 49,
                operands: [7]
            };
        }

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