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
 * Validate an answer for a given problem
 * @param {MathProblem} problem - The math problem
 * @param {number} answer - The answer to validate
 * @returns {boolean} Whether the answer is correct
 */
function validateAnswer(problem, answer) {
    return problem.validate(answer);
}

/**
 * Get the expression for a problem
 * @param {MathProblem} problem - The math problem
 * @returns {string} The problem expression
 */
function getProblemExpression(problem) {
    return problem.expression;
}

/**
 * Get the point value for a problem
 * @param {MathProblem} problem - The math problem
 * @returns {number} Points for solving this problem
 */
function getPoints(problem) {
    return problem.getPoints();
}

/**
 * Get the correct answer for a problem
 * @param {MathProblem} problem - The math problem
 * @returns {number} The correct answer
 */
function getAnswer(problem) {
    return problem.answer;
}

/**
 * Create a problem of a specific type and difficulty
 * @param {string} problemType - The type of problem to create
 * @param {string} difficulty - The difficulty level
 * @returns {MathProblem} A new math problem instance
 */
function createProblemOfType(problemType, difficulty = 'medium') {
    return createMathProblem(difficulty, problemType);
}

export {
    // Main functions (original API)
    createMathProblem,
    validateAnswer,
    getProblemExpression,
    getPoints,
    getAnswer,

    // New functions
    createProblemOfType,
    getAvailableProblemTypes,
    getAvailableDifficultyLevels,

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