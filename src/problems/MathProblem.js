/**
 * Main class for math problems, combining a problem type with a difficulty level
 */
export default class MathProblem {
    /**
     * Create a new math problem
     * @param {Object} problemType - The type of problem (addition, subtraction, etc.)
     * @param {Object} difficultyLevel - The difficulty level
     */
    constructor(problemType, difficultyLevel) {
        this.problemType = problemType;
        this.difficultyLevel = difficultyLevel;
        this.problemDetails = null;
        this.generate();
    }

    /**
     * Generate a math problem
     */
    generate() {
        const params = this.difficultyLevel.getParametersForType(this.problemType.type);
        this.problemDetails = this.problemType.generate(params);
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
}