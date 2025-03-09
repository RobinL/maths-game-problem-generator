/**
 * Base class for all problem types (addition, subtraction, etc.)
 */
export default class ProblemType {
    /**
     * Create a new problem type
     * @param {string} type - The type name (e.g., 'addition', 'subtraction')
     */
    constructor(type) {
        this.type = type;
        this.symbol = '';
    }

    /**
     * Generate a problem with the given difficulty parameters
     * @param {Object} difficultyParams - Parameters defining the difficulty
     * @returns {Object} Problem with expression and answer
     */
    generate(difficultyParams) {
        throw new Error('ProblemType.generate() must be implemented by subclasses');
    }

    /**
     * Get the operation symbol for display
     * @returns {string} Symbol representing this operation
     */
    getSymbol() {
        return this.symbol;
    }
}