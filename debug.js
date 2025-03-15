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

// Test the improved checkAnswer function with decimal cases
console.log("\n----- TESTING IMPROVED ANSWER CHECKING -----");

// Test case 1: Decimal addition (8.1 + 4.22 = 12.32)
const decimalProblem = {
    expression: "8.1 + 4.22",
    expression_short: "8.1 + 4.22",
    answer: 12.32,
    formattedAnswer: "12.32",
    type: "addition",
    yearLevel: "year5"
};

console.log("Test Case 1: Decimal Addition");
console.log("Problem:", decimalProblem.expression);
console.log("Correct Answer:", decimalProblem.answer);

// Test with correct answer
checkAnswer(decimalProblem, 12.32);

// Test with slightly different answer due to floating point
checkAnswer(decimalProblem, 12.32000000000001);

// Test with incorrect answer
checkAnswer(decimalProblem, 12.31);

// Test case 2: Integer addition
const integerProblem = {
    expression: "25 + 17",
    expression_short: "25 + 17",
    answer: 42,
    formattedAnswer: "42",
    type: "addition",
    yearLevel: "year3"
};

console.log("\nTest Case 2: Integer Addition");
console.log("Problem:", integerProblem.expression);
console.log("Correct Answer:", integerProblem.answer);

// Test with correct answer
checkAnswer(integerProblem, 42);

// Test with string answer
checkAnswer(integerProblem, "42");

// Test with incorrect answer
checkAnswer(integerProblem, 41);

// Test case 3: Invalid input
console.log("\nTest Case 3: Invalid Input");
checkAnswer(integerProblem, "not a number");

a = 2;