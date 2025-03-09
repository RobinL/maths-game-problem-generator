/**
 * Base class for math problems
 */
export default class MathProblem {
    /**
     * Create a new math problem
     * @param {string} difficulty - The difficulty level ('easy', 'medium', or 'hard')
     */
    constructor(difficulty = 'easy') {
        this.difficulty = difficulty;
        this.expression = '';
        this.answer = 0;
        this.generate();
    }

    /**
     * Generate a math problem
     * This method should be overridden by subclasses
     */
    generate() {
        console.warn('MathProblem.generate() called on base class - should be overridden');
    }

    /**
     * Validate if the provided answer is correct
     * @param {number} userAnswer - The user's answer to check
     * @returns {boolean} Whether the answer is correct
     */
    validate(userAnswer) {
        return userAnswer === this.answer;
    }

    /**
     * Get the point value for this problem
     * @returns {number} Points for solving this problem
     */
    getPoints() {
        switch (this.difficulty) {
            case 'hard':
                return 50;
            case 'medium':
                return 30;
            default:
                return 20;
        }
    }
}