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
    }

    generate() {
        // In Year 1, division is approached as sharing or halving
        // Children solve problems like sharing items between 2 people
        // Halving simple even numbers up to 20 is the main expectation

        // Randomly choose between different types of Year 1 division problems
        const problemType = this._getRandomInt(1, 3);

        let a, b, expression;

        switch (problemType) {
            case 1: // Halving even numbers up to 20
                b = 2;
                a = this._getRandomInt(1, 10) * 2; // Ensure even number
                expression = `Half of ${a}`;
                break;

            case 2: // Simple division by 2 (sharing between 2)
                b = 2;
                a = this._getRandomInt(2, 20);
                expression = `${a} ${this.symbol} ${b}`;
                break;

            case 3: // Simple sharing problems with small numbers
                b = this._getRandomInt(2, 5);
                a = b * this._getRandomInt(1, 4); // Ensure divisible
                expression = `Share ${a} equally between ${b}`;
                break;
        }

        this.problemDetails = {
            expression: expression,
            answer: a / b,
            operands: [a, b]
        };
    }
}