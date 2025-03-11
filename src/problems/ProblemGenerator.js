import { DIFFICULTY_LEVELS } from '../difficulty/DifficultyLevel.js';

// Import Reception-specific problem classes
import ReceptionAdditionProblem from './reception/ReceptionAdditionProblem.js';
import ReceptionSubtractionProblem from './reception/ReceptionSubtractionProblem.js';
import ReceptionMultiplicationProblem from './reception/ReceptionMultiplicationProblem.js';
import ReceptionDivisionProblem from './reception/ReceptionDivisionProblem.js';

// Import Year 1-specific problem classes
import Year1AdditionProblem from './year1/Year1AdditionProblem.js';
import Year1SubtractionProblem from './year1/Year1SubtractionProblem.js';
import Year1MultiplicationProblem from './year1/Year1MultiplicationProblem.js';
import Year1DivisionProblem from './year1/Year1DivisionProblem.js';
import Year1SquaredProblem from './year1/Year1SquaredProblem.js';

// Import Year 2-specific problem classes
import Year2AdditionProblem from './year2/Year2AdditionProblem.js';
import Year2SubtractionProblem from './year2/Year2SubtractionProblem.js';
import Year2MultiplicationProblem from './year2/Year2MultiplicationProblem.js';
import Year2DivisionProblem from './year2/Year2DivisionProblem.js';
import Year2SquaredProblem from './year2/Year2SquaredProblem.js';

// Import Year 3-specific problem classes
import Year3AdditionProblem from './year3/Year3AdditionProblem.js';
import Year3SubtractionProblem from './year3/Year3SubtractionProblem.js';
import Year3MultiplicationProblem from './year3/Year3MultiplicationProblem.js';
import Year3DivisionProblem from './year3/Year3DivisionProblem.js';
import Year3SquaredProblem from './year3/Year3SquaredProblem.js';

// Import Year 4-specific problem classes
import Year4AdditionProblem from './year4/Year4AdditionProblem.js';
import Year4SubtractionProblem from './year4/Year4SubtractionProblem.js';
import Year4MultiplicationProblem from './year4/Year4MultiplicationProblem.js';
import Year4DivisionProblem from './year4/Year4DivisionProblem.js';
import Year4SquaredProblem from './year4/Year4SquaredProblem.js';


/**
 * Problem type registry by year and operation
 */
const PROBLEM_TYPE_CLASSES = {
    reception: {
        addition: ReceptionAdditionProblem,
        subtraction: ReceptionSubtractionProblem,
        multiplication: ReceptionMultiplicationProblem,
        division: ReceptionDivisionProblem,
        // Squared not used in Reception
    },
    // Year 1 problem types
    year1: {
        addition: Year1AdditionProblem,
        subtraction: Year1SubtractionProblem,
        multiplication: Year1MultiplicationProblem,
        division: Year1DivisionProblem,
        squared: Year1SquaredProblem
    },
    // Year 2 problem types
    year2: {
        addition: Year2AdditionProblem,
        subtraction: Year2SubtractionProblem,
        multiplication: Year2MultiplicationProblem,
        division: Year2DivisionProblem,
        squared: Year2SquaredProblem
    },
    // Year 3 problem types
    year3: {
        addition: Year3AdditionProblem,
        subtraction: Year3SubtractionProblem,
        multiplication: Year3MultiplicationProblem,
        division: Year3DivisionProblem,
        squared: Year3SquaredProblem
    },
    // Year 4 problem types
    year4: {
        addition: Year4AdditionProblem,
        subtraction: Year4SubtractionProblem,
        multiplication: Year4MultiplicationProblem,
        division: Year4DivisionProblem,
        squared: Year4SquaredProblem
    },
    // Legacy problem types for other years (to be replaced)

};

/**
 * Problem type probability distributions per difficulty level
 * These define the likelihood of each problem type being chosen
 */
const TYPE_DISTRIBUTIONS = {
    reception: {
        addition: 0.6,      // Focus on simple addition
        subtraction: 0.3,   // Simple "taking away"
        multiplication: 0.1, // Simple doubling only (presented as "Double X")
        division: 0.0,      // Simple halving only (presented as "Half of X")
        squared: 0          // Not taught at this level
    },
    year1: {
        addition: 0.45,     // Addition within 20
        subtraction: 0.45,  // Subtraction within 20
        multiplication: 0.05, // Doubling and counting in 2s, 5s, 10s
        division: 0.05,     // Halving small numbers
        squared: 0          // Not taught at this level
    },
    year2: {
        addition: 0.35,     // Addition facts up to 20
        subtraction: 0.35,  // Subtraction facts within 20
        multiplication: 0.15, // 2, 5, 10 times tables
        division: 0.15,     // Division with 2, 5, 10
        squared: 0          // Not formally taught
    },
    year3: {
        addition: 0.3,      // Two-digit sums in multiples of 10
        subtraction: 0.3,   // Two-digit differences in multiples of 10
        multiplication: 0.2, // 2, 3, 4, 5, 8, 10 times tables
        division: 0.2,      // Division with 2, 3, 4, 5, 8, 10
        squared: 0          // Not formally taught as "squares"
    },
    year4: {
        addition: 0.25,     // Three-digit sums without carrying
        subtraction: 0.25,  // Three-digit differences without borrowing
        multiplication: 0.25, // All tables up to 12×12
        division: 0.2,      // Division with tables up to 12
        squared: 0.05       // Squares through times tables
    },
    year5: {
        addition: 0.25,     // Two-digit sums and decimals
        subtraction: 0.25,  // Two-digit differences and decimals
        multiplication: 0.2, // Multiply by 10, 100
        division: 0.2,      // Divide by 10, 100
        squared: 0.1        // Formally introduced: squares of integers 1-12
    },
    year6: {
        addition: 0.2,      // Three-digit sums if simple
        subtraction: 0.2,   // Three-digit differences if simple
        multiplication: 0.2, // Mental multiplication with easy numbers
        division: 0.2,      // Mental division with easy numbers
        squared: 0.2        // Recall square numbers up to 12²
    },
    year7: {
        addition: 0.2,      // Three-digit sums and decimals with up to two places
        subtraction: 0.2,   // Three-digit differences and decimals with up to two places
        multiplication: 0.2, // Two-digit by one-digit multiplication
        division: 0.2,      // Three-digit by one-digit division
        squared: 0.2        // Square numbers up to 12²
    },
    year8: {
        addition: 0.2,      // Four-digit sums and decimals with up to three places
        subtraction: 0.2,   // Four-digit differences and decimals with up to three places
        multiplication: 0.2, // Two-digit by two-digit multiplication
        division: 0.2,      // Four-digit by one-digit division
        squared: 0.2        // Square numbers up to 15²
    },
    year9: {
        addition: 0.2,      // Four-digit sums, decimals with up to four places, scientific notation
        subtraction: 0.2,   // Four-digit differences, decimals with up to four places, scientific notation
        multiplication: 0.2, // Three-digit by one-digit multiplication
        division: 0.2,      // Division with two-digit divisors
        squared: 0.2        // Square numbers up to 15² and cube numbers up to 5³
    }
};

/**
 * Create a math problem of the specified difficulty
 * @param {string} difficulty - The difficulty level ('reception', 'year1', 'year2', etc.)
 * @param {string|null} specificType - Optional specific problem type
 * @returns {Object} A new math problem instance
 */
function createMathProblem(difficulty = 'reception', specificType = null) {
    // Get the difficulty level
    const difficultyLevel = DIFFICULTY_LEVELS[difficulty] || DIFFICULTY_LEVELS.reception;

    // Determine problem type
    let problemType;

    if (specificType) {
        if (PROBLEM_TYPE_CLASSES[difficulty] && PROBLEM_TYPE_CLASSES[difficulty][specificType]) {
            // Use the year-specific problem class
            const ProblemClass = PROBLEM_TYPE_CLASSES[difficulty][specificType];
            problemType = new ProblemClass();
        } else {
            // Default to addition if type not found
            const ProblemClass = PROBLEM_TYPE_CLASSES[difficulty].addition;
            problemType = new ProblemClass();
        }
    } else {
        // Select a type based on the distribution for this difficulty
        const type = selectProblemType(difficulty);

        if (PROBLEM_TYPE_CLASSES[difficulty] && PROBLEM_TYPE_CLASSES[difficulty][type]) {
            // Use the year-specific problem class
            const ProblemClass = PROBLEM_TYPE_CLASSES[difficulty][type];
            problemType = new ProblemClass();
        } else {
            // Default to addition if type not found
            const ProblemClass = PROBLEM_TYPE_CLASSES[difficulty].addition;
            problemType = new ProblemClass();
        }
    }

    // Return the problem (the constructor will generate it)
    return problemType;
}

/**
 * Select a problem type based on the distribution for the given difficulty
 * @param {string} difficulty - The difficulty level
 * @returns {string} A problem type name
 */
function selectProblemType(difficulty) {
    const distribution = TYPE_DISTRIBUTIONS[difficulty] || TYPE_DISTRIBUTIONS.reception;
    const rand = Math.random();

    let cumulativeProbability = 0;
    for (const [type, probability] of Object.entries(distribution)) {
        cumulativeProbability += probability;
        if (rand < cumulativeProbability && probability > 0) {
            return type;
        }
    }

    // Fallback to addition if somehow nothing was selected
    return 'addition';
}

/**
 * Get all available problem types
 * @returns {Array<string>} List of available problem types
 */
function getAvailableProblemTypes() {
    // Return the common problem types across all year groups
    return ['addition', 'subtraction', 'multiplication', 'division', 'squared'];
}

/**
 * Get all available difficulty levels
 * @returns {Array<string>} List of available difficulty levels
 */
function getAvailableDifficultyLevels() {
    return ['reception', 'year1', 'year2', 'year3', 'year4'];
}

export {
    createMathProblem,
    getAvailableProblemTypes,
    getAvailableDifficultyLevels,
    DIFFICULTY_LEVELS
};