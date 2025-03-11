import BaseDivisionProblem from '../base/BaseDivisionProblem.js';
import { DIFFICULTY_LEVELS } from '../../difficulty/DifficultyLevel.js';

/**
 * Division problem for Year 3 (focused on division facts from the 3, 4, and 8 times tables)
 * @extends BaseDivisionProblem
 */
export default class Year3DivisionProblem extends BaseDivisionProblem {

    constructor() {
        super(DIFFICULTY_LEVELS.year3);
        this.symbol = '÷';
        this.generate()
    }

    generate() {
        // Year 3 students extend mental division to include facts from the 3, 4, and 8 tables
        // Division problems that go with the tables they've learned are expected to be done mentally
        // They also practice using the inverse relationship with multiplication

        // Randomly choose between different types of Year 3 division problems
        const problemType = this._getRandomInt(1, 5);

        let a, b, expression;

        switch (problemType) {
            case 1: // Division by 3 (related to 3 times table)
                b = 3;
                a = b * this._getRandomInt(1, 12); // Ensure divisible by 3
                expression = `${a} ${this.symbol} ${b}`;
                break;

            case 2: // Division by 4 (related to 4 times table)
                b = 4;
                a = b * this._getRandomInt(1, 12); // Ensure divisible by 4
                expression = `${a} ${this.symbol} ${b}`;
                break;

            case 3: // Division by 8 (related to 8 times table)
                b = 8;
                a = b * this._getRandomInt(1, 12); // Ensure divisible by 8
                expression = `${a} ${this.symbol} ${b}`;
                break;

            case 4: // Review of division by 2, 5, 10 from earlier years
                // Choose between 2, 5, and 10 for the divisor
                b = [2, 5, 10][this._getRandomInt(0, 2)];
                a = b * this._getRandomInt(1, 12); // Ensure divisible
                expression = `${a} ${this.symbol} ${b}`;
                break;

            case 5: // Division as inverse of multiplication (e.g., since 8×4=32, then 32÷4=8)
                // Choose from 2, 3, 4, 5, 8, 10 for the divisor
                b = [2, 3, 4, 5, 8, 10][this._getRandomInt(0, 5)];
                // Choose a two-digit dividend that's divisible by the divisor
                a = b * this._getRandomInt(2, 12);

                // Occasionally phrase as "How many groups of X in Y?"
                if (this._getRandomInt(0, 1) === 0) {
                    expression = `${a} ${this.symbol} ${b}`;
                } else {
                    expression = `How many groups of ${b} in ${a}?`;
                    // Add short expression for game blocks (max 9 chars)
                    this.problemDetails = {
                        expression: expression,
                        expression_short: `${a} ${this.symbol} ${b}`,
                        answer: a / b,
                        operands: [a, b]
                    };
                    return; // Exit early as we've already set problemDetails
                }
                break;
        }

        this.problemDetails = {
            expression: expression,
            answer: a / b,
            operands: [a, b]
        };
    }
}