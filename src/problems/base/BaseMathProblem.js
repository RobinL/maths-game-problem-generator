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
     * Get the problem expression
     * @returns {string} The formatted expression
     */
    get expression() {
        return this.problemDetails?.expression || '';
    }

    /**
     * Get the correct answer
     * @returns {number} The answer
     */
    get answer() {
        return this.problemDetails?.answer || 0;
    }

    /**
     * Validate if the provided answer is correct
     * @param {number} userAnswer - The user's answer to check
     * @returns {boolean} Whether the answer is correct
     */
    validate(userAnswer) {
        const isCorrect = userAnswer === this.answer;

        // Debug logging
        console.log('------- Answer Validation -------');
        console.log(`Problem: ${this.expression} = ?`);
        console.log(`User answer: ${userAnswer} (${typeof userAnswer})`);
        console.log(`Correct answer: ${this.answer} (${typeof this.answer})`);
        console.log(`Result: ${isCorrect ? '✅ Correct' : '❌ Incorrect'}`);

        // Check for potential issues
        if (!isCorrect && Math.abs(userAnswer - this.answer) < 0.0001) {
            console.log('⚠️ Very close! Possible floating-point precision issue.');
        }

        return isCorrect;
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