import BaseDivisionProblem from '../base/BaseDivisionProblem.js';
import { DIFFICULTY_LEVELS } from '../../difficulty/DifficultyLevel.js';

/**
 * Division problem for Year 1 (focused on sharing and halving)
 * @extends BaseDivisionProblem
 */
export default class Year1DivisionProblem extends BaseDivisionProblem {

    constructor() {
        super(DIFFICULTY_LEVELS.year1);
        this.symbol = '÷';
        this.generate();
    }

    generate() {
        // In Year 1, division is approached as sharing or halving
        // Children solve problems like sharing items between 2 people
        // Halving simple even numbers up to 20 is the main expectation

        // Randomly choose between different types of Year 1 division problems
        const problemType = this._getRandomInt(1, 3);

        let a, b, expression;

        let expression_short = null;

        switch (problemType) {
            case 1:
                b = 2;
                a = this._getRandomInt(1, 10) * 2; // Ensure even number
                expression = `Half ${a}`;
                expression_short = `${a} ${this.symbol} ${b}`;
                break;

            case 2:
                b = 2;
                a = this._getRandomInt(1, 10) * 2;
                expression = `${a} ${this.symbol} ${b}`;
                // No explicit expression_short needed; base class will use expression
                break;

            case 3:
                b = this._getRandomInt(2, 5);
                a = b * this._getRandomInt(1, 4); // Ensure divisible
                expression = `Share ${a} equally between ${b}`;
                expression_short = `${a} ${this.symbol} ${b}`;
                break;
        }

        // Assign problemDetails *after* the switch, ensuring it always happens.
        this.problemDetails = {
            expression: expression,
            // Conditionally add expression_short only if it was set above
            ...(expression_short && { expression_short: expression_short }),
            answer: a / b, // Calculation uses 'a' and 'b' determined in the switch
            operands: [a, b]
        };
    }
}