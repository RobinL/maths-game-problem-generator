import BaseMultiplicationProblem from '../base/BaseMultiplicationProblem.js';
import { DIFFICULTY_LEVELS } from '../../difficulty/DifficultyLevel.js';

/**
 * Multiplication problem for Year 1 (focused on 2, 5, and 10 times tables and doubling)
 * @extends BaseMultiplicationProblem
 */
export default class Year1MultiplicationProblem extends BaseMultiplicationProblem {
    constructor() {
        super(DIFFICULTY_LEVELS.year1);
        this.symbol = '×';
        this.generate()
    }

    generate() {
        // In Year 1, multiplication is introduced in simple terms
        // Children solve problems involving multiplying by 2, 5, or 10
        // Doubling is a key focus (multiplying by 2)

        // Randomly choose between different types of Year 1 multiplication problems
        const problemType = this._getRandomInt(1, 3);

        let a, b, expression;
        let expression_short = null;

        switch (problemType) {
            case 1: // Doubling small numbers
                a = this._getRandomInt(1, 10);
                b = 2;
                expression = `Double ${a}`;
                expression_short = `${a} ${this.symbol} ${b}`;
                break;

            case 2: // Simple multiplication by 2
                a = this._getRandomInt(1, 5);
                b = 2;
                expression = `${a} ${this.symbol} ${b}`;
                break;

            case 3: // Simple multiplication by 5 or 10
                a = this._getRandomInt(1, 3);
                b = this._getRandomInt(0, 1) === 0 ? 5 : 10;
                expression = `${a} ${this.symbol} ${b}`;
                break;
        }

        // Assign problemDetails after the switch, ensuring it always happens
        this.problemDetails = {
            expression: expression,
            // Conditionally add expression_short only if it was set
            ...(expression_short && { expression_short: expression_short }),
            answer: a * b,
            operands: [a, b]
        };
    }
}