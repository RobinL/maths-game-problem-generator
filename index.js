/**
 * Math Game Problem Generator
 * A JavaScript library for generating math problems tailored to different UK primary school year levels.
 */

import {
    createMathProblem,
    getAvailableProblemTypes,
    getAvailableDifficultyLevels,
    DIFFICULTY_LEVELS,
    PROBLEM_TYPES
} from './src/problems/ProblemGenerator.js';

import MathProblem from './src/problems/MathProblem.js';
import ProblemType from './src/problems/ProblemType.js';
import DifficultyLevel from './src/difficulty/DifficultyLevel.js';

// Import problem types for direct access
import AdditionProblem from './src/problems/AdditionProblem.js';
import SubtractionProblem from './src/problems/SubtractionProblem.js';
import MultiplicationProblem from './src/problems/MultiplicationProblem.js';
import DivisionProblem from './src/problems/DivisionProblem.js';
import SquaredProblem from './src/problems/SquaredProblem.js';

/**
 * Create a math problem of the specified difficulty and type
 * @param {string} difficulty - The difficulty level ('reception', 'year1', etc.)
 * @param {string|null} specificType - Optional specific problem type
 * @returns {Object} A math problem instance
 */
function createProblem(difficulty = 'reception', specificType = null) {
    return createMathProblem(difficulty, specificType);
}

/**
 * Get all available problem types
 * @returns {Array<string>} List of available problem types
 */
function getAvailableTypes() {
    return getAvailableProblemTypes();
}

/**
 * Get all available difficulty levels
 * @returns {Array<string>} List of available difficulty levels
 */
function getAvailableDifficulties() {
    return getAvailableDifficultyLevels();
}

/**
 * Validate an answer for a given problem
 * @param {Object} problem - The math problem
 * @param {number} answer - The answer to validate
 * @returns {boolean} Whether the answer is correct
 */
function validateAnswer(problem, answer) {
    return problem.validate(answer);
}

/**
 * Get the expression for a problem
 * @param {Object} problem - The math problem
 * @returns {string} The problem expression
 */
function getProblemExpression(problem) {
    return problem.expression;
}

/**
 * Get the points for a problem
 * @param {Object} problem - The math problem
 * @returns {number} The points value
 */
function getPoints(problem) {
    return problem.getPoints();
}

/**
 * Get the answer for a problem
 * @param {Object} problem - The math problem
 * @returns {number} The correct answer
 */
function getAnswer(problem) {
    return problem.answer;
}

export {
    // Main functions (original API)
    createMathProblem,
    validateAnswer,
    getProblemExpression,
    getPoints,
    getAnswer,

    // New functions
    createProblem,
    getAvailableTypes,
    getAvailableDifficulties,

    // Classes for direct access
    MathProblem,
    ProblemType,
    DifficultyLevel,
    AdditionProblem,
    SubtractionProblem,
    MultiplicationProblem,
    DivisionProblem,
    SquaredProblem,

    // Constants
    DIFFICULTY_LEVELS,
    PROBLEM_TYPES
};