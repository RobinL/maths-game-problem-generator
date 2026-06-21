import { DIFFICULTY_LEVELS } from '../difficulty/DifficultyLevel.js';

// Import Reception-specific problem classes
import ReceptionAdditionProblem from './reception/ReceptionAdditionProblem.js';
import ReceptionSubtractionProblem from './reception/ReceptionSubtractionProblem.js';
import ReceptionMultiplicationProblem from './reception/ReceptionMultiplicationProblem.js';
import ReceptionDivisionProblem from './reception/ReceptionDivisionProblem.js';
import ReceptionFractionProblem from './reception/ReceptionFractionProblem.js';

// Import Year 1-specific problem classes
import Year1AdditionProblem from './year1/Year1AdditionProblem.js';
import Year1SubtractionProblem from './year1/Year1SubtractionProblem.js';
import Year1MultiplicationProblem from './year1/Year1MultiplicationProblem.js';
import Year1DivisionProblem from './year1/Year1DivisionProblem.js';
import Year1SquaredProblem from './year1/Year1SquaredProblem.js';
import Year1FractionProblem from './year1/Year1FractionProblem.js';

// Import Year 2-specific problem classes
import Year2AdditionProblem from './year2/Year2AdditionProblem.js';
import Year2SubtractionProblem from './year2/Year2SubtractionProblem.js';
import Year2MultiplicationProblem from './year2/Year2MultiplicationProblem.js';
import Year2DivisionProblem from './year2/Year2DivisionProblem.js';
import Year2SquaredProblem from './year2/Year2SquaredProblem.js';
import Year2FractionProblem from './year2/Year2FractionProblem.js';

// Import Year 3-specific problem classes
import Year3AdditionProblem from './year3/Year3AdditionProblem.js';
import Year3SubtractionProblem from './year3/Year3SubtractionProblem.js';
import Year3MultiplicationProblem from './year3/Year3MultiplicationProblem.js';
import Year3DivisionProblem from './year3/Year3DivisionProblem.js';
import Year3SquaredProblem from './year3/Year3SquaredProblem.js';
import Year3FractionProblem from './year3/Year3FractionProblem.js';

// Import Year 4-specific problem classes
import Year4AdditionProblem from './year4/Year4AdditionProblem.js';
import Year4SubtractionProblem from './year4/Year4SubtractionProblem.js';
import Year4MultiplicationProblem from './year4/Year4MultiplicationProblem.js';
import Year4DivisionProblem from './year4/Year4DivisionProblem.js';
import Year4SquaredProblem from './year4/Year4SquaredProblem.js';
import Year4FractionProblem from './year4/Year4FractionProblem.js';

// Import Year 5-specific problem classes
import Year5AdditionProblem from './year5/Year5AdditionProblem.js';
import Year5SubtractionProblem from './year5/Year5SubtractionProblem.js';
import Year5MultiplicationProblem from './year5/Year5MultiplicationProblem.js';
import Year5DivisionProblem from './year5/Year5DivisionProblem.js';
import Year5SquaredProblem from './year5/Year5SquaredProblem.js';
import Year5CubeProblem from './year5/Year5CubeProblem.js';
import Year5FractionProblem from './year5/Year5FractionProblem.js';

// Import Year 6-specific problem classes
import Year6AdditionProblem from './year6/Year6AdditionProblem.js';
import Year6SubtractionProblem from './year6/Year6SubtractionProblem.js';
import Year6MultiplicationProblem from './year6/Year6MultiplicationProblem.js';
import Year6DivisionProblem from './year6/Year6DivisionProblem.js';
import Year6SquaredProblem from './year6/Year6SquaredProblem.js';
import Year6CubeProblem from './year6/Year6CubeProblem.js';
import Year6FractionProblem from './year6/Year6FractionProblem.js';


/**
 * Problem type registry by year and operation
 */
const PROBLEM_TYPE_CLASSES = {
    reception: {
        addition: ReceptionAdditionProblem,
        subtraction: ReceptionSubtractionProblem,
        multiplication: ReceptionMultiplicationProblem,
        division: ReceptionDivisionProblem,
        fraction: ReceptionFractionProblem,
        // Squared not used in Reception
    },
    // Year 1 problem types
    year1: {
        addition: Year1AdditionProblem,
        subtraction: Year1SubtractionProblem,
        multiplication: Year1MultiplicationProblem,
        division: Year1DivisionProblem,
        squared: Year1SquaredProblem,
        fraction: Year1FractionProblem
    },
    // Year 2 problem types
    year2: {
        addition: Year2AdditionProblem,
        subtraction: Year2SubtractionProblem,
        multiplication: Year2MultiplicationProblem,
        division: Year2DivisionProblem,
        squared: Year2SquaredProblem,
        fraction: Year2FractionProblem
    },
    // Year 3 problem types
    year3: {
        addition: Year3AdditionProblem,
        subtraction: Year3SubtractionProblem,
        multiplication: Year3MultiplicationProblem,
        division: Year3DivisionProblem,
        squared: Year3SquaredProblem,
        fraction: Year3FractionProblem
    },
    // Year 4 problem types
    year4: {
        addition: Year4AdditionProblem,
        subtraction: Year4SubtractionProblem,
        multiplication: Year4MultiplicationProblem,
        division: Year4DivisionProblem,
        squared: Year4SquaredProblem,
        fraction: Year4FractionProblem
    },
    // Year 5 problem types
    year5: {
        addition: Year5AdditionProblem,
        subtraction: Year5SubtractionProblem,
        multiplication: Year5MultiplicationProblem,
        division: Year5DivisionProblem,
        squared: Year5SquaredProblem,
        cube: Year5CubeProblem,
        fraction: Year5FractionProblem
    },
    // Year 6 problem types
    year6: {
        addition: Year6AdditionProblem,
        subtraction: Year6SubtractionProblem,
        multiplication: Year6MultiplicationProblem,
        division: Year6DivisionProblem,
        squared: Year6SquaredProblem,
        cube: Year6CubeProblem,
        fraction: Year6FractionProblem
    },
    // Legacy problem types for other years (to be replaced)

};

/**
 * Problem type probability distributions per difficulty level
 * These define the likelihood of each problem type being chosen
 */
const TYPE_DISTRIBUTIONS = {
    reception: {
        addition: 0.55,     // Focus on simple addition
        subtraction: 0.25,  // Simple "taking away"
        multiplication: 0.1, // Simple doubling only (presented as "Double X")
        division: 0.0,      // Simple halving only (presented as "Half of X")
        fraction: 0.1,      // Equal sharing and informal halving
        squared: 0          // Not taught at this level
    },
    year1: {
        addition: 0.4,      // Addition within 20
        subtraction: 0.4,   // Subtraction within 20
        multiplication: 0.05, // Doubling and counting in 2s, 5s, 10s
        division: 0.05,     // Halving small numbers
        fraction: 0.1,      // Halves and quarters of quantities
        squared: 0          // Not taught at this level
    },
    year2: {
        addition: 0.3,      // Addition facts up to 20
        subtraction: 0.3,   // Subtraction facts within 20
        multiplication: 0.15, // 2, 5, 10 times tables
        division: 0.15,     // Division with 2, 5, 10
        fraction: 0.1,      // Halves, thirds, quarters and simple equivalence
        squared: 0          // Not formally taught
    },
    year3: {
        addition: 0.25,     // Three-digit mental addition
        subtraction: 0.25,  // Three-digit mental subtraction
        multiplication: 0.2, // Expanded scope
        division: 0.2,      // Division facts
        fraction: 0.1,      // Unit fractions, comparison and same-denominator addition
        squared: 0          // Not formally taught as "squares"
    },
    year4: {
        addition: 0.225,    // Three-digit numbers and simple decimals
        subtraction: 0.225, // Complements to 100/1000 and simple decimals
        multiplication: 0.225, // All times tables up to 12 × 12
        division: 0.225,    // Division facts from times tables up to 12 × 12
        fraction: 0.1,      // Non-unit fractions, tenths and decimal equivalence
        squared: 0          // Not formally emphasized yet
    },
    year5: {
        addition: 0.18,     // Four-digit numbers and decimals
        subtraction: 0.18,  // Large numbers and decimals with rounding strategies
        multiplication: 0.18, // Complex mental multiplication with factors
        division: 0.18,     // Factor pairs and mental division strategies
        squared: 0.18,      // Formally introduced with notation
        fraction: 0.1       // Fraction operators, equivalence and mixed numbers
    },
    year6: {
        addition: 0.18,     // Fluent with large numbers and decimals
        subtraction: 0.18,  // Multi-step strategies with large numbers and decimals
        multiplication: 0.18, // Complex mental calculations and decimals
        division: 0.18,     // Multi-step division and decimal division
        squared: 0.18,      // Consolidation of square numbers knowledge
        fraction: 0.1       // Upper-primary fraction toolkit
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
    return ['addition', 'subtraction', 'multiplication', 'division', 'squared', 'cube', 'fraction'];
}

/**
 * Get all available difficulty levels
 * @returns {Array<string>} List of available difficulty levels
 */
function getAvailableDifficultyLevels() {
    return ['reception', 'year1', 'year2', 'year3', 'year4', 'year5', 'year6'];
}

export {
    createMathProblem,
    getAvailableProblemTypes,
    getAvailableDifficultyLevels,
    DIFFICULTY_LEVELS
};
