/**
 * Debug script for testing the Math Problem Generator library
 */
import {
    generateProblem,
    checkAnswer,
    getYearLevels,
    getProblemTypes,
    YEAR_LEVELS,
    PROBLEM_TYPES
} from './index.js';

// Test variable
let a = 1;

// Using the simplified API structure with options object
let p = generateProblem({
    yearLevel: YEAR_LEVELS.YEAR3,
    type: PROBLEM_TYPES.DIVISION
});

console.log("Problem:", p);

// Test checking answer
const isCorrect = checkAnswer(p, p.answer);
console.log("Is answer correct?", isCorrect);

// Print available year levels and problem types
console.log("Available year levels:", getYearLevels());
console.log("Available problem types:", getProblemTypes());

// Generate various problems using different approaches
const problems = [
    // Using YEAR_LEVELS constant
    generateProblem({ yearLevel: YEAR_LEVELS.RECEPTION }),

    // Using string directly
    generateProblem({ yearLevel: 'year2', type: 'addition' }),

    // With type only
    generateProblem({ type: PROBLEM_TYPES.MULTIPLICATION }),

    // With no parameters (should use defaults)
    generateProblem()
];

// Log all generated problems
console.log("Generated problems:");
problems.forEach((problem, index) => {
    console.log(`Problem ${index + 1}:`, problem);
});

a = 2;