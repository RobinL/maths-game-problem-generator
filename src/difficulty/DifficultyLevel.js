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
 * Pre-defined difficulty levels
 */
export const DIFFICULTY_LEVELS = {
    easy: new DifficultyLevel('easy', 20, {
        default: {
            minValue: 1,
            maxValue: 10,
            ensurePositiveResult: true
        },
        addition: {
            minValue: 1,
            maxValue: 10
        },
        subtraction: {
            minValue: 1,
            maxValue: 10,
            ensurePositiveResult: true
        },
        multiplication: {
            minValue: 1,
            maxValue: 5
        },
        division: {
            minDivisor: 2,
            maxDivisor: 5,
            minResult: 1,
            maxResult: 5,
            allowRemainder: false
        }
    }),

    medium: new DifficultyLevel('medium', 30, {
        default: {
            minValue: 10,
            maxValue: 50,
            ensurePositiveResult: true
        },
        addition: {
            minValue: 10,
            maxValue: 50
        },
        subtraction: {
            minValue: 10,
            maxValue: 99,
            ensurePositiveResult: true
        },
        multiplication: {
            minValue: 2,
            maxValue: 12
        },
        division: {
            minDivisor: 2,
            maxDivisor: 10,
            minResult: 1,
            maxResult: 10,
            allowRemainder: false
        }
    }),

    hard: new DifficultyLevel('hard', 50, {
        default: {
            minValue: 10,
            maxValue: 99,
            ensurePositiveResult: true
        },
        addition: {
            minValue: 10,
            maxValue: 99
        },
        subtraction: {
            minValue: 10,
            maxValue: 99,
            ensurePositiveResult: true
        },
        multiplication: {
            minValue: 5,
            maxValue: 12
        },
        division: {
            minDivisor: 2,
            maxDivisor: 12,
            minResult: 1,
            maxResult: 12,
            allowRemainder: true
        }
    })
};