import MathProblem from './MathProblem.js';
import AdditionProblem from './AdditionProblem.js';
import SubtractionProblem from './SubtractionProblem.js';
import MultiplicationProblem from './MultiplicationProblem.js';
import DivisionProblem from './DivisionProblem.js';
import { DIFFICULTY_LEVELS } from '../difficulty/DifficultyLevel.js';

// Create instances of each problem type
const PROBLEM_TYPES = {
    addition: new AdditionProblem(),
    subtraction: new SubtractionProblem(),
    multiplication: new MultiplicationProblem(),
    division: new DivisionProblem()
};

/**
 * Problem type probability distributions per difficulty level
 * These define the likelihood of each problem type being chosen
 */
const TYPE_DISTRIBUTIONS = {
    easy: {
        addition: 0.6,
        subtraction: 0.4,
        multiplication: 0,
        division: 0
    },
    medium: {
        addition: 0.25,
        subtraction: 0.25,
        multiplication: 0.25,
        division: 0.25
    },
    hard: {
        addition: 0.2,
        subtraction: 0.2,
        multiplication: 0.4,
        division: 0.2
    }
};

/**
 * Create a math problem of the specified difficulty
 * @param {string} difficulty - The difficulty level ('easy', 'medium', or 'hard')
 * @param {string|null} specificType - Optional specific problem type
 * @returns {MathProblem} A new math problem instance
 */
function createMathProblem(difficulty = 'easy', specificType = null) {
    // Get the difficulty level
    const difficultyLevel = DIFFICULTY_LEVELS[difficulty] || DIFFICULTY_LEVELS.easy;

    // Determine problem type
    let problemType;

    if (specificType && PROBLEM_TYPES[specificType]) {
        // Use the specified type if valid
        problemType = PROBLEM_TYPES[specificType];
    } else {
        // Select a type based on the distribution for this difficulty
        problemType = selectProblemType(difficulty);
    }

    // Create and return the problem
    return new MathProblem(problemType, difficultyLevel);
}

/**
 * Select a problem type based on the distribution for the given difficulty
 * @param {string} difficulty - The difficulty level
 * @returns {Object} A problem type instance
 */
function selectProblemType(difficulty) {
    const distribution = TYPE_DISTRIBUTIONS[difficulty] || TYPE_DISTRIBUTIONS.easy;
    const rand = Math.random();

    let cumulativeProbability = 0;
    for (const [type, probability] of Object.entries(distribution)) {
        cumulativeProbability += probability;
        if (rand < cumulativeProbability && probability > 0) {
            return PROBLEM_TYPES[type];
        }
    }

    // Fallback to addition if somehow nothing was selected
    return PROBLEM_TYPES.addition;
}

/**
 * Get all available problem types
 * @returns {Array<string>} List of available problem types
 */
function getAvailableProblemTypes() {
    return Object.keys(PROBLEM_TYPES);
}

/**
 * Get all available difficulty levels
 * @returns {Array<string>} List of available difficulty levels
 */
function getAvailableDifficultyLevels() {
    return Object.keys(DIFFICULTY_LEVELS);
}

export {
    createMathProblem,
    getAvailableProblemTypes,
    getAvailableDifficultyLevels,
    DIFFICULTY_LEVELS,
    PROBLEM_TYPES
};