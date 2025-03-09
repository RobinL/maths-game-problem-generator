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
     * @param {number} params.maxCharacters - Maximum number of characters for the expression
     * @param {boolean} params.includeCubes - Whether to include cube numbers (e.g., 5³)
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

        // Handle cube numbers (for Year 9)
        if (params.includeCubes && Math.random() < 0.3) {
            // For Year 9, include cube numbers up to 5³
            const a = this._getRandomInt(2, 5);
            let expression = `${a}³`;

            // Check if the expression fits within maxCharacters
            if (params.maxCharacters && expression.length > params.maxCharacters) {
                expression = `${a}^3`;
            }

            return {
                expression,
                answer: a * a * a,
                operands: [a]
            };
        }

        // Handle addition of squares (for Year 6)
        if (params.includeSquareAddition) {
            const a = this._getRandomInt(effectiveMinValue, params.maxValue);
            const b = this._getRandomInt(effectiveMinValue, params.maxValue);

            // For Year 6, include specific examples like 3² + 9²
            if (Math.random() < 0.3) {
                let expression = `3${this.symbol} + 9${this.symbol}`;

                // Check if the expression fits within maxCharacters
                if (params.maxCharacters && expression.length > params.maxCharacters) {
                    expression = `3²+9²`;
                }

                return {
                    expression,
                    answer: 9 + 81,
                    operands: [3, 9]
                };
            }

            let expression = `${a}${this.symbol} + ${b}${this.symbol}`;

            // Check if the expression fits within maxCharacters
            if (params.maxCharacters && expression.length > params.maxCharacters) {
                expression = `${a}²+${b}²`;

                // If still too long, try with smaller numbers
                if (expression.length > params.maxCharacters) {
                    const smallerA = Math.min(a, 9);
                    const smallerB = Math.min(b, 9);
                    expression = `${smallerA}²+${smallerB}²`;
                }
            }

            return {
                expression,
                answer: (a * a) + (b * b),
                operands: [a, b]
            };
        }

        // For Year 4, focus on squares up to 5²
        // For Year 5 and 6, include squares up to 12²
        // For Year 7 and 8, include squares up to 15²
        const a = this._getRandomInt(effectiveMinValue, params.maxValue);

        // For Year 5, include specific examples like 7²
        if (params.maxValue >= 7 && Math.random() < 0.3) {
            let expression = `7${this.symbol}`;

            // Check if the expression fits within maxCharacters
            if (params.maxCharacters && expression.length > params.maxCharacters) {
                expression = `7^2`;
            }

            return {
                expression,
                answer: 49,
                operands: [7]
            };
        }

        let expression = `${a}${this.symbol}`;

        // Check if the expression fits within maxCharacters
        if (params.maxCharacters && expression.length > params.maxCharacters) {
            expression = `${a}^2`;
        }

        return {
            expression,
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