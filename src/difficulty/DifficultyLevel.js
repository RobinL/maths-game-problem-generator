/**
 * Class to define difficulty levels and parameters
 */
export default class DifficultyLevel {
    /**
     * Create a new difficulty level
     * @param {string} name - The name of the difficulty level
     * @param {number} points - Points awarded for problems of this difficulty
     * @param {Object} parameters - Parameters defining problem generation
     */
    constructor(name, points, parameters) {
        this.name = name;
        this.points = points;
        this.parameters = parameters;
    }

    /**
     * Get parameters for a specific problem type
     * @param {string} problemType - The type of problem
     * @returns {Object} Parameters for the given problem type
     */
    getParametersForType(problemType) {
        return this.parameters[problemType] || this.parameters.default || {};
    }

    /**
     * Get points for this difficulty level
     * @returns {number} Points value
     */
    getPoints() {
        return this.points;
    }
}

/**
 * Pre-defined difficulty levels based on UK primary school age-related expectations
 */
export const DIFFICULTY_LEVELS = {
    reception: new DifficultyLevel('reception', 10, {
        default: {
            minValue: 1,
            maxValue: 5,
            ensurePositiveResult: true
        },
        addition: {
            minValue: 1,
            maxValue: 5,
            restrictToEasyCalculations: true, // Simple sums with numbers up to 5
            maxSum: 10 // Ensure sums don't exceed 10
        },
        subtraction: {
            minValue: 1,
            maxValue: 5,
            ensurePositiveResult: true // Taking away from a small group
        },
        multiplication: {
            minValue: 2,
            maxValue: 5,
            isDoubling: true, // Flag to indicate this is doubling, not multiplication
            avoidTrivial: true // Avoid trivial problems like 1×1
        },
        division: {
            minDivisor: 2,
            maxDivisor: 2,
            minResult: 1,
            maxResult: 5,
            allowRemainder: false,
            isHalving: true, // Flag to indicate this is halving, not division
            maxDividend: 10 // Limit to halving numbers up to 10
        },
        squared: {
            enabled: false // Not taught at this level
        }
    }),

    year1: new DifficultyLevel('year1', 15, {
        default: {
            minValue: 1,
            maxValue: 10,
            ensurePositiveResult: true
        },
        addition: {
            minValue: 1,
            maxValue: 10,
            maxSum: 20 // Ensure sums don't exceed 20
        },
        subtraction: {
            minValue: 1,
            maxValue: 20,
            ensurePositiveResult: true // Subtract within 20
        },
        multiplication: {
            minValue: 2,
            maxValue: 5,
            isDoubling: true, // Flag to indicate this is doubling, not multiplication
            avoidTrivial: true, // Avoid trivial problems like 1×1
            isCountingInSteps: true // Flag to indicate this is counting in steps
        },
        division: {
            minDivisor: 2,
            maxDivisor: 2,
            minResult: 1,
            maxResult: 5,
            allowRemainder: false,
            isHalving: true, // Flag to indicate this is halving, not division
            maxDividend: 10 // Limit to halving numbers up to 10
        },
        squared: {
            enabled: false // Not taught at this level
        }
    }),

    year2: new DifficultyLevel('year2', 20, {
        default: {
            minValue: 1,
            maxValue: 100,
            ensurePositiveResult: true
        },
        addition: {
            minValue: 10,
            maxValue: 50, // Addition facts up to 100
            restrictToEasyCalculations: true, // Number bonds to 20 and beyond
            maxSum: 100 // Ensure sums don't exceed 100
        },
        subtraction: {
            minValue: 10,
            maxValue: 50,
            ensurePositiveResult: true, // Subtraction facts within 100
            restrictToEasyCalculations: true
        },
        multiplication: {
            minValue: 2,
            maxValue: 10,
            restrictToTables: [2, 5, 10], // 2, 5, 10 times tables
            singleDigitOnly: true, // Ensure single-digit by single-digit
            avoidTrivial: true // Avoid trivial problems like 1×1
        },
        division: {
            minDivisor: 2,
            maxDivisor: 10,
            restrictToDivisors: [2, 5, 10], // Division using 2, 5, 10 times tables
            minResult: 1,
            maxResult: 10,
            allowRemainder: false,
            singleDigitDivisorOnly: true, // Ensure single-digit divisors
            avoidTrivial: true // Avoid trivial problems like 2÷2
        },
        squared: {
            enabled: false // Not formally taught, but may encounter 2×2, 5×5 through multiplication
        }
    }),

    year3: new DifficultyLevel('year3', 25, {
        default: {
            minValue: 10,
            maxValue: 100,
            ensurePositiveResult: true
        },
        addition: {
            minValue: 10,
            maxValue: 100, // Reduced from 999
            restrictToMultiplesOf: 10, // Two-digit sums in multiples of 10 (e.g., 30 + 40)
            maxSum: 300 // Ensure sums don't exceed 300
        },
        subtraction: {
            minValue: 10,
            maxValue: 100, // Reduced from 999
            restrictToMultiplesOf: 10, // Two-digit differences in multiples of 10 (e.g., 80 - 50)
            ensurePositiveResult: true
        },
        multiplication: {
            minValue: 2,
            maxValue: 10,
            restrictToTables: [2, 3, 4, 5, 8, 10], // 2, 3, 4, 5, 8, 10 times tables
            singleDigitOnly: true, // Ensure single-digit by single-digit
            avoidTrivial: true // Avoid trivial problems like 1×1
        },
        division: {
            minDivisor: 2,
            maxDivisor: 10,
            restrictToDivisors: [2, 3, 4, 5, 8, 10], // Division using these tables
            minResult: 2,
            maxResult: 10,
            allowRemainder: false,
            singleDigitDivisorOnly: true, // Ensure single-digit divisors
            avoidTrivial: true, // Avoid trivial problems like 2÷2
            includeLargerDividends: true // Include problems like 48÷8=6
        },
        squared: {
            enabled: false // Not formally taught as "squares" but encountered through tables
        }
    }),

    year4: new DifficultyLevel('year4', 30, {
        default: {
            minValue: 10,
            maxValue: 1000,
            ensurePositiveResult: true
        },
        addition: {
            minValue: 100,
            maxValue: 999,
            noCarrying: true, // Three-digit sums without carrying
            restrictToEasyCalculations: true // Number pairs that total 100 (e.g., 37 + 63)
        },
        subtraction: {
            minValue: 100,
            maxValue: 999,
            noBorrowing: true, // Three-digit differences without borrowing
            ensurePositiveResult: true,
            restrictToEasyCalculations: true // Complements to 100/1000
        },
        multiplication: {
            minValue: 2,
            maxValue: 12, // All tables up to 12×12
            includeDoubleDigit: true, // Include double-digit multiplication
            avoidTrivial: true // Avoid trivial problems like 1×1
        },
        division: {
            minDivisor: 2,
            maxDivisor: 12,
            minResult: 2,
            maxResult: 12,
            allowRemainder: false, // Division using all tables
            includeLargerDividends: true, // Include larger dividends
            avoidTrivial: true // Avoid trivial problems like 2÷2
        },
        squared: {
            minValue: 2,
            maxValue: 5, // Squares up to 5² (25)
            enabled: true
        }
    }),

    year5: new DifficultyLevel('year5', 40, {
        default: {
            minValue: 10,
            maxValue: 10000,
            ensurePositiveResult: true
        },
        addition: {
            minValue: 20,
            maxValue: 99, // Two-digit sums (e.g., 68 + 25)
            restrictToEasyCalculations: true, // Adding decimals to make 1 (e.g., 0.7 + 0.3)
            includeDecimals: true
        },
        subtraction: {
            minValue: 20,
            maxValue: 99, // Two-digit differences (e.g., 83 - 47)
            ensurePositiveResult: true,
            restrictToEasyCalculations: true, // Subtracting decimals (e.g., 1.0 - 0.4)
            includeDecimals: true
        },
        multiplication: {
            minValue: 10,
            maxValue: 100,
            restrictToMultiplesOf: [10, 100], // Multiply by 10, 100
            includeTwoDigitByOneDigit: true, // Include two-digit by one-digit (e.g., 56 × 9)
            includeDecimals: true, // Include decimal multiplication (e.g., 0.75 × 4)
            avoidTrivial: true // Avoid trivial problems like 1×1
        },
        division: {
            minDivisor: 2,
            maxDivisor: 12,
            restrictToDivisors: [2, 3, 4, 5, 6, 8, 9, 10, 12], // Include more divisors
            minResult: 5,
            maxResult: 20,
            allowRemainder: false,
            includeLargerDividends: true, // Include larger dividends (e.g., 120 ÷ 8)
            avoidTrivial: true // Avoid trivial problems like 2÷2
        },
        squared: {
            minValue: 2,
            maxValue: 12, // Formally introduced: squares of integers 1-12
            enabled: true
        }
    }),

    year6: new DifficultyLevel('year6', 50, {
        default: {
            minValue: 10,
            maxValue: 10000,
            ensurePositiveResult: true
        },
        addition: {
            minValue: 100,
            maxValue: 999,
            restrictToEasyCalculations: true, // Three-digit sums if simple (e.g., 340 + 260)
            includeDecimals: true, // Include decimal addition
            includePercentages: true // Include percentage calculations
        },
        subtraction: {
            minValue: 100,
            maxValue: 999,
            restrictToEasyCalculations: true, // Three-digit differences if simple (e.g., 500 - 240)
            ensurePositiveResult: true,
            includeDecimals: true, // Include decimal subtraction
            includePercentages: true // Include percentage calculations
        },
        multiplication: {
            minValue: 10,
            maxValue: 100,
            restrictToEasyCalculations: true, // Mental multiplication with easy numbers (e.g., 25 × 4)
            includeDecimals: true, // Include decimal multiplication (e.g., 6 × 1.2)
            includeTwoDigitByTwoDigit: true, // Include two-digit by two-digit
            avoidTrivial: true // Avoid trivial problems like 1×1
        },
        division: {
            minDivisor: 4,
            maxDivisor: 12,
            restrictToEasyCalculations: true, // Mental division with easy numbers (e.g., 240 ÷ 6)
            minResult: 10,
            maxResult: 100,
            allowRemainder: true, // Allow remainders at this level
            includeDecimals: true, // Include decimal division
            includeLargerDividends: true, // Include larger dividends
            avoidTrivial: true, // Avoid trivial problems like 2÷2
            ensureAccurateDecimals: true // Ensure decimal results are accurate
        },
        squared: {
            minValue: 2,
            maxValue: 12, // Recall square numbers up to 12² with ease
            enabled: true,
            includeSquareAddition: true // Include addition of squares (e.g., 5² + 3²)
        }
    })
};