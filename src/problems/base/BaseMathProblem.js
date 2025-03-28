/**
 * Base class for all math problems
 */
export default class BaseMathProblem {
    /**
     * Create a new math problem
     * @param {Object} difficultyLevel - The difficulty level
     */
    constructor(difficultyLevel) {
        this.difficultyLevel = difficultyLevel;
        this.problemDetails = null;
    }

    /**
     * Generate a math problem - to be implemented by subclasses
     */
    generate() {
        throw new Error('BaseMathProblem.generate() must be implemented by subclasses');
    }

    /**
     * Get the problem expression with properly formatted numbers
     * @returns {string} The formatted expression
     */
    get expression() {
        if (!this.problemDetails?.expression) return '';

        // Replace any numbers in the expression with their formatted versions
        return this.problemDetails.expression.replace(/[-+]?\d+(\.\d+)?/g, match => {
            const num = parseFloat(match);
            if (Number.isInteger(num)) return num.toString();
            return this._formatNumber(num);
        });
    }

    /**
     * Get the short version of the problem expression (max 9 chars)
     * @returns {string} The short formatted expression
     */
    get expression_short() {
        // Return expression_short if explicitly provided, otherwise fall back to regular expression
        return this.problemDetails?.expression_short || this.expression;
    }

    /**
     * Get the correct answer with proper formatting
     * @returns {number} The answer (original numeric value)
     */
    get answer() {
        return this.problemDetails?.answer || 0;
    }

    /**
     * Get the formatted string representation of the answer
     * @returns {string} The formatted answer
     */
    get formattedAnswer() {
        return this._formatNumber(this.answer);
    }

    /**
     * Format a number to avoid floating-point precision issues
     * @param {number} value - The number to format
     * @param {number} [precision=10] - Maximum decimal places to show
     * @returns {string} Formatted number string
     * @private
     */
    _formatNumber(value, precision = 10) {
        if (typeof value !== 'number') return String(value);

        // Return integers as-is
        if (Number.isInteger(value)) return value.toString();

        // Round to avoid floating-point issues
        // Using a maximum precision but trimming trailing zeros
        return parseFloat(value.toFixed(precision)).toString();
    }

    /**
     * Get the point value for this problem
     * @returns {number} Points for solving this problem
     */
    getPoints() {
        return this.difficultyLevel.getPoints();
    }

    /**
     * Helper function to get a random integer between min and max (inclusive)
     * @param {number} min - Minimum value
     * @param {number} max - Maximum value
     * @returns {number} Random integer
     */
    _getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    /**
     * Helper function to get a random decimal between min and max with specified decimal places
     * @param {number} min - Minimum value
     * @param {number} max - Maximum value
     * @param {number} decimalPlaces - Number of decimal places
     * @returns {number} Random decimal
     */
    _getRandomDecimal(min, max, decimalPlaces) {
        const rand = Math.random() * (max - min) + min;
        const factor = Math.pow(10, decimalPlaces);
        return Math.round(rand * factor) / factor;
    }
}