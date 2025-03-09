import EasyMath from './src/problems/EasyMath.js';
import MediumMath from './src/problems/MediumMath.js';
import HardMath from './src/problems/HardMath.js';
import MathProblem from './src/problems/MathProblem.js';

/**
 * Create a math problem of the specified difficulty
 * @param {string} difficulty - The difficulty level ('easy', 'medium', or 'hard')
 * @returns {MathProblem} A new math problem instance
 */
function createMathProblem(difficulty) {
    switch (difficulty) {
        case 'hard':
            return new HardMath();
        case 'medium':
            return new MediumMath();
        case 'easy':
        default:
            return new EasyMath();
    }
}

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

export {
    createMathProblem,
    validateAnswer,
    getProblemExpression,
    getPoints,
    getAnswer,
    // Also export the classes if direct access is needed
    MathProblem,
    EasyMath,
    MediumMath,
    HardMath
};