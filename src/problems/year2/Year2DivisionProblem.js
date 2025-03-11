import BaseDivisionProblem from '../base/BaseDivisionProblem.js';
import { DIFFICULTY_LEVELS } from '../../difficulty/DifficultyLevel.js';

/**
 * Division problem for Year 2 (focused on division facts from the 2, 5, and 10 times tables)
 * @extends BaseDivisionProblem
 */
export default class Year2DivisionProblem extends BaseDivisionProblem {

    constructor() {
        super(DIFFICULTY_LEVELS.year2);
        this.symbol = '÷';
        this.generate()
    }

    generate() {
        // Year 2 students divide using the facts from the 2, 5, and 10 tables
        // They should recognize division as the inverse of multiplication for these facts
        // They solve simple division problems mentally, especially if they map to familiar table facts

        // Randomly choose between different types of Year 2 division problems
        const problemType = this._getRandomInt(1, 4);

        let a, b, expression;

        switch (problemType) {
            case 1: // Division by 2 (related to 2 times table)
                b = 2;
                a = b * this._getRandomInt(1, 10); // Ensure divisible by 2
                expression = `${a} ${this.symbol} ${b}`;
                break;

            case 2: // Division by 5 (related to 5 times table)
                b = 5;
                a = b * this._getRandomInt(1, 10); // Ensure divisible by 5
                expression = `${a} ${this.symbol} ${b}`;
                break;

            case 3: // Division by 10 (related to 10 times table)
                b = 10;
                a = b * this._getRandomInt(1, 10); // Ensure divisible by 10
                expression = `${a} ${this.symbol} ${b}`;
                break;

            case 4: // Division as inverse of multiplication (e.g., since 5×2=10, then 10÷2=5)
                // Choose between 2, 5, and 10 for the divisor
                b = [2, 5, 10][this._getRandomInt(0, 2)];
                a = b * this._getRandomInt(1, 10); // Ensure divisible

                // Occasionally phrase as "How many groups of X in Y?"
                if (this._getRandomInt(0, 1) === 0) {
                    expression = `${a} ${this.symbol} ${b}`;
                } else {
                    expression = `How many groups of ${b} in ${a}?`;
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