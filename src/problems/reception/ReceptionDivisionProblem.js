import BaseDivisionProblem from '../base/BaseDivisionProblem.js';
import { DIFFICULTY_LEVELS } from '../../difficulty/DifficultyLevel.js';

/**
 * Division problem for Reception year (presented as halving)
 * @extends BaseDivisionProblem
 */
export default class ReceptionDivisionProblem extends BaseDivisionProblem {
    /**
     * Create a new Reception division problem
     */
    constructor() {
        super(DIFFICULTY_LEVELS.reception);
        // Override the symbol to indicate this is halving
        this.symbol = '÷';
        this.generate()
    }

    generate() {
        const minResult = 1;
        const maxResult = 5;
        const divisor = 2; // Always halving
        const result = this._getRandomInt(minResult, maxResult);
        const dividend = result * divisor;

        const expression = `Half ${dividend}`;
        let expression_short = `${dividend} ${this.symbol} ${divisor}`;

        this.problemDetails = {
            expression: expression,
            expression_short: expression_short,
            answer: result,
            operands: [dividend, divisor]
        };
    }
}