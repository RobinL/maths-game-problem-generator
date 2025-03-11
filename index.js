/**
 * Math Game Problem Generator
 * A simplified JavaScript library for generating math problems tailored
 * to different UK primary school year levels
 */

// Import core components
import {
    createMathProblem,
    getAvailableProblemTypes,
    getAvailableDifficultyLevels,
    DIFFICULTY_LEVELS
} from './src/problems/ProblemGenerator.js';

/**
 * Generate a single math problem
 * @param {string} yearLevel - School year level ('reception', 'year1', 'year2', etc.)
 * @param {string} [problemType] - Optional problem type ('addition', 'subtraction', etc.)
 * @returns {Object} Math problem with expression and answer
 */
function generateProblem(yearLevel = 'reception', problemType = null) {
    const problem = createMathProblem(yearLevel, problemType);
    return {
        expression: problem.expression,
        answer: problem.answer,
        type: problem.type || problemType || 'unknown',
        yearLevel: yearLevel,
        points: problem.getPoints ? problem.getPoints() : DIFFICULTY_LEVELS[yearLevel].points
    };
}

/**
 * Generate multiple math problems
 * @param {Object} options - Generation options
 * @param {string} [options.yearLevel='reception'] - School year level
 * @param {string} [options.problemType=null] - Problem type (if null, will generate a mix)
 * @param {number} [options.count=5] - Number of problems to generate
 * @returns {Array<Object>} Array of math problems
 */
function generateProblems(options = {}) {
    const {
        yearLevel = 'reception',
        problemType = null,
        count = 5
    } = options;

    const problems = [];
    for (let i = 0; i < count; i++) {
        problems.push(generateProblem(yearLevel, problemType));
    }
    return problems;
}

/**
 * Check if a user's answer is correct
 * @param {Object} problem - The problem object
 * @param {number|string} userAnswer - The user's answer (can be number or string)
 * @returns {boolean} Whether the answer is correct
 */
function checkAnswer(problem, userAnswer) {
    // Convert string answers to numbers if needed
    const numericAnswer = typeof userAnswer === 'string'
        ? parseFloat(userAnswer)
        : userAnswer;

    // Handle potential floating point issues
    if (typeof problem.answer === 'number' && typeof numericAnswer === 'number') {
        return Math.abs(problem.answer - numericAnswer) < 0.0001;
    }

    return problem.answer === numericAnswer;
}

/**
 * Get all available difficulty levels
 * @returns {Array<string>} Array of available difficulty levels
 */
function getAvailableLevels() {
    return getAvailableDifficultyLevels();
}

/**
 * Get all available problem types
 * @returns {Array<string>} Array of available problem types
 */
function getAvailableTypes() {
    return getAvailableProblemTypes();
}

// Export the public API
export {
    generateProblem,
    generateProblems,
    checkAnswer,
    getAvailableLevels,
    getAvailableTypes,
    DIFFICULTY_LEVELS
};

// Default export for convenience
export default {
    generate: generateProblem,
    generateMany: generateProblems,
    check: checkAnswer,
    levels: getAvailableLevels,
    types: getAvailableTypes
};