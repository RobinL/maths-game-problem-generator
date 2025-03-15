/**
 * Math Game Problem Generator
 * A simplified JavaScript library for generating math problems tailored
 * to different UK primary school year levels
 */

// Import core components
import {
    createMathProblem,
    getAvailableProblemTypes,
    getAvailableDifficultyLevels
} from './src/problems/ProblemGenerator.js';

/**
 * Generate a single math problem
 * @param {Object} options - Options for problem generation
 * @param {string} [options.yearLevel='reception'] - School year level (see YEAR_LEVELS for options)
 * @param {string} [options.type=null] - Optional problem type (see PROBLEM_TYPES for options)
 * @returns {Object} Math problem with expression and answer
 */
function generateProblem(options = {}) {
    const yearLevel = options.yearLevel || 'reception';
    const type = options.type || null;

    const problem = createMathProblem(yearLevel, type);

    return {
        expression: problem.expression,
        expression_short: problem.expression_short,
        answer: problem.answer,
        // Use the formatted answer string for display purposes
        formattedAnswer: problem.formattedAnswer,
        type: problem.type || type || 'unknown',
        yearLevel: yearLevel
    };
}

/**
 * Check if a user's answer is correct for a given problem
 *
 * @param {Object} problem - The problem object returned by generateProblem
 * @param {number|string} userAnswer - The user's answer (can be number or string)
 * @returns {boolean} Whether the answer is correct
 */
function checkAnswer(problem, userAnswer) {
    // Convert userAnswer to a number if it's a string
    const numericUserAnswer = typeof userAnswer === 'string' ? parseFloat(userAnswer) : userAnswer;

    // Handle NaN or invalid inputs
    if (isNaN(numericUserAnswer)) {
        console.log(`User Answer: ${userAnswer}, Correct Answer: ${problem.answer}, Correct: false`);
        return false;
    }

    // Determine decimal places in both answers
    const correctAnswerStr = problem.answer.toString();
    const userAnswerStr = numericUserAnswer.toString();
    const correctDecimalPlaces = (correctAnswerStr.split('.')[1] || '').length;
    const userDecimalPlaces = (userAnswerStr.split('.')[1] || '').length;
    const maxDecimalPlaces = Math.max(correctDecimalPlaces, userDecimalPlaces, 2); // Minimum 2 for consistency

    // Round both numbers to the same precision
    const roundedCorrectAnswer = Number(problem.answer.toFixed(maxDecimalPlaces));
    const roundedUserAnswer = Number(numericUserAnswer.toFixed(maxDecimalPlaces));

    // Use a small tolerance for floating-point comparison
    const tolerance = 1e-10;
    const isCorrect = Math.abs(roundedCorrectAnswer - roundedUserAnswer) < tolerance;

    // Log the details
    console.log(`User Answer: ${numericUserAnswer}, Correct Answer: ${problem.answer}, Correct: ${isCorrect}`);

    return isCorrect;
}

/**
 * Get all available year levels supported by the generator
 *
 * @returns {Array<string>} List of available year levels
 */
function getYearLevels() {
    return getAvailableDifficultyLevels();
}

/**
 * Get all available problem types supported by the generator
 *
 * @returns {Array<string>} List of available problem types
 */
function getProblemTypes() {
    return getAvailableProblemTypes();
}

// Create constants for easier reference, but dynamically
// generate them to avoid hardcoding
const YEAR_LEVELS = getYearLevels().reduce((acc, level) => {
    // Convert 'year1' to 'YEAR1', 'reception' to 'RECEPTION'
    const constant = level.toUpperCase();
    acc[constant] = level;
    return acc;
}, {});

const PROBLEM_TYPES = getProblemTypes().reduce((acc, type) => {
    // Convert 'addition' to 'ADDITION'
    const constant = type.toUpperCase();
    acc[constant] = type;
    return acc;
}, {});

// Export the public API
export {
    generateProblem,
    checkAnswer,
    getYearLevels,
    getProblemTypes,
    YEAR_LEVELS,
    PROBLEM_TYPES
};

// Default export
export default {
    generateProblem,
    checkAnswer,
    getYearLevels,
    getProblemTypes,
    yearLevels: YEAR_LEVELS,
    problemTypes: PROBLEM_TYPES
};