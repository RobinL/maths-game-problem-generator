import BaseMultiplicationProblem from '../base/BaseMultiplicationProblem.js';
import { DIFFICULTY_LEVELS } from '../../difficulty/DifficultyLevel.js';

/**
 * Multiplication problem for Year 3 (focused on 3, 4, and 8 times tables, plus 2, 5, 10 from earlier)
 * @extends BaseMultiplicationProblem
 */
export default class Year3MultiplicationProblem extends BaseMultiplicationProblem {

    constructor() {
        super(DIFFICULTY_LEVELS.year3);
        this.symbol = '×';
        this.generate()
    }

    generate() {
        // By Year 3, children memorize the 3, 4, and 8 times tables, on top of the 2, 5, 10 from earlier
        // They should recall these facts quickly in mental math
        // They also start using these facts to multiply larger numbers by one digit

        // Randomly choose between different types of Year 3 multiplication problems
        const problemType = this._getRandomInt(1, 5);

        let a, b, expression;

        switch (problemType) {
            case 1: // 3 times table (up to 3 × 12)
                a = this._getRandomInt(2, 12); // Start from 2 to avoid trivial 1×3
                b = 3;
                expression = `${a} ${this.symbol} ${b}`;
                break;

            case 2: // 4 times table (up to 4 × 12)
                a = this._getRandomInt(2, 12); // Start from 2 to avoid trivial 1×4
                b = 4;
                expression = `${a} ${this.symbol} ${b}`;
                break;

            case 3: // 8 times table (up to 8 × 12)
                a = this._getRandomInt(2, 12); // Start from 2 to avoid trivial 1×8
                b = 8;
                expression = `${a} ${this.symbol} ${b}`;
                break;

            case 4: // Review of 2, 5, 10 times tables from earlier years
                // Choose between 2, 5, and 10 for one factor
                b = [2, 5, 10][this._getRandomInt(0, 2)];
                a = this._getRandomInt(2, 12); // Start from 2 to avoid trivial 1×b
                expression = `${a} ${this.symbol} ${b}`;
                break;

            case 5: // Multiply a two-digit number by a one-digit number (e.g., 12 × 3)
                a = this._getRandomInt(10, 20);
                // Choose from 2, 3, 4, 5, 8, 10 for the one-digit factor
                b = [2, 3, 4, 5, 8, 10][this._getRandomInt(0, 5)];
                expression = `${a} ${this.symbol} ${b}`;
                break;
        }

        this.problemDetails = {
            expression: expression,
            answer: a * b,
            operands: [a, b]
        };
    }
}