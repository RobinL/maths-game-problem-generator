import BaseMathProblem from './BaseMathProblem.js';

/**
 * Base class for all cube number problems (n³) and cube root problems (³√N).
 * @extends BaseMathProblem
 */
export default class BaseCubeProblem extends BaseMathProblem {
    /**
     * Create a new cube problem.
     * @param {Object} difficultyLevel - The difficulty level.
     */
    constructor(difficultyLevel) {
        super(difficultyLevel);
        this.type = 'cube';
        // Note: The symbol '³' is primarily for n³ problems.
        // Cube root problems will use '³√' in their expression format.
        this.symbol = '³';
    }

    /**
     * Generate a cube problem - to be implemented by subclasses.
     */
    generate() {
        throw new Error('BaseCubeProblem.generate() must be implemented by subclasses');
    }

    /**
     * Format the expression for display (specifically for n³).
     * Subclasses might override or use different formatting for roots.
     * @param {number} a - The base number being cubed.
     * @returns {string} Formatted expression like 'a³'.
     */
    formatExpression(a) {
        return `${a}${this.symbol}`;
    }
}