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
 * @param {boolean} [options.multipleChoice=false] - Include plausible multiple-choice answers
 * @param {number} [options.choiceCount=4] - Number of answer choices to return when multipleChoice is true
 * @returns {Object} Math problem with expression and answer
 */
function generateProblem(options = {}) {
    const yearLevel = options.yearLevel || 'reception';
    const type = options.type || null;
    const multipleChoice = options.multipleChoice === true;
    const choiceCount = Number.isInteger(options.choiceCount) ? Math.max(2, options.choiceCount) : 4;

    const problem = createMathProblem(yearLevel, type);

    const generatedProblem = {
        expression: problem.expression,
        expression_short: problem.expression_short,
        answer: problem.answer,
        // Use the formatted answer string for display purposes
        formattedAnswer: problem.formattedAnswer,
        type: problem.type || type || 'unknown',
        yearLevel: yearLevel
    };

    if (!multipleChoice) {
        return generatedProblem;
    }

    const choices = createMultipleChoiceAnswers(generatedProblem, { choiceCount });

    return {
        ...generatedProblem,
        choices,
        correctChoice: generatedProblem.formattedAnswer
    };
}

/**
 * Create plausible multiple-choice answer strings for a generated problem.
 *
 * Distractors favour nearby values, common operation slips, and scale-adjacent
 * answers so they feel educationally plausible rather than arbitrary.
 *
 * @param {Object} problem - A problem returned by generateProblem
 * @param {Object} options - Multiple-choice options
 * @param {number} [options.choiceCount=4] - Number of choices to return
 * @returns {Array<string>} Shuffled answer choices including the correct answer
 */
function createMultipleChoiceAnswers(problem, options = {}) {
    const choiceCount = Number.isInteger(options.choiceCount) ? Math.max(2, options.choiceCount) : 4;
    const correct = Number(problem.answer);
    const formattedCorrect = problem.formattedAnswer ?? formatChoiceValue(correct);

    const choices = new Map([[formattedCorrect, correct]]);
    const candidates = buildDistractorCandidates(problem);

    for (const candidate of candidates) {
        addChoice(choices, candidate, correct);
        if (choices.size >= choiceCount) {
            break;
        }
    }

    let fallbackStep = getFallbackStep(correct);
    let direction = 1;
    while (choices.size < choiceCount) {
        const candidate = correct + fallbackStep * direction;
        addChoice(choices, candidate, correct);
        direction = direction > 0 ? -direction : -direction + 1;
        if (direction === 0) {
            direction = 1;
            fallbackStep += getFallbackStep(correct);
        }
    }

    return shuffleChoices([...choices.keys()]);
}

function buildDistractorCandidates(problem) {
    const correct = Number(problem.answer);
    const operands = extractNumbers(problem.expression);
    const candidates = [];

    candidates.push(...nearbyCandidates(correct, problem.yearLevel));

    if (operands.length >= 2) {
        const [a, b] = operands;
        candidates.push(a + b, Math.abs(a - b), a * b);
        if (b !== 0) {
            candidates.push(a / b);
        }
        if (a !== 0) {
            candidates.push(b / a);
        }
        candidates.push((a + 1) * b, a * (b + 1), Math.max(0, a - 1) * b, a * Math.max(0, b - 1));
        candidates.push(a + b + 10, a + b - 10);
    }

    if (operands.length === 1) {
        const [value] = operands;
        candidates.push(value * 2, value + 2, value - 2, value * value, Math.sqrt(value));
    }

    candidates.push(correct * 10, correct / 10, correct + 10, correct - 10);
    candidates.push(Math.round(correct), Math.floor(correct), Math.ceil(correct));

    return candidates
        .filter((value) => Number.isFinite(value))
        .sort((a, b) => Math.abs(a - correct) - Math.abs(b - correct));
}

function nearbyCandidates(correct, yearLevel = 'reception') {
    const magnitude = Math.max(1, Math.abs(correct));
    const baseSteps = magnitude < 10 ? [1, 2, 3] : magnitude < 100 ? [1, 2, 5, 10] : [5, 10, 20, 50];
    const decimalSteps = ['year5', 'year6'].includes(yearLevel) && !Number.isInteger(correct) ? [0.1, 0.2, 0.5, 1] : [];
    const steps = [...decimalSteps, ...baseSteps];
    return steps.flatMap((step) => [correct - step, correct + step]);
}

function extractNumbers(expression) {
    return (expression.match(/[-+]?\d+(\.\d+)?/g) ?? []).map(Number);
}

function addChoice(choices, candidate, correct) {
    if (!Number.isFinite(candidate)) {
        return;
    }

    const normalizedCandidate = normalizeChoiceValue(candidate, correct);
    const label = formatChoiceValue(normalizedCandidate);
    if (label === formatChoiceValue(correct)) {
        return;
    }

    choices.set(label, normalizedCandidate);
}

function normalizeChoiceValue(value, correct) {
    if (Number.isInteger(correct)) {
        return Math.round(value);
    }

    return Number(value.toFixed(2));
}

function formatChoiceValue(value) {
    if (typeof value !== 'number') {
        return String(value);
    }
    if (Number.isInteger(value)) {
        return String(value);
    }
    return parseFloat(value.toFixed(10)).toString();
}

function getFallbackStep(correct) {
    const magnitude = Math.max(1, Math.abs(correct));
    if (!Number.isInteger(correct)) {
        return magnitude < 10 ? 0.1 : 1;
    }
    if (magnitude < 10) {
        return 1;
    }
    if (magnitude < 100) {
        return 5;
    }
    return 10;
}

function shuffleChoices(choices) {
    const shuffled = [...choices];
    for (let index = shuffled.length - 1; index > 0; index -= 1) {
        const swapIndex = Math.floor(Math.random() * (index + 1));
        [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
    }
    return shuffled;
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
    createMultipleChoiceAnswers,
    checkAnswer,
    getYearLevels,
    getProblemTypes,
    YEAR_LEVELS,
    PROBLEM_TYPES
};

// Default export
export default {
    generateProblem,
    createMultipleChoiceAnswers,
    checkAnswer,
    getYearLevels,
    getProblemTypes,
    yearLevels: YEAR_LEVELS,
    problemTypes: PROBLEM_TYPES
};
