import BaseMultiplicationProblem from '../base/BaseMultiplicationProblem.js';
import { DIFFICULTY_LEVELS } from '../../difficulty/DifficultyLevel.js';

/**
 * Multiplication problem for Year 2 (focused on 2, 5, and 10 times tables)
 * @extends BaseMultiplicationProblem
 */
export default class Year2MultiplicationProblem extends BaseMultiplicationProblem {

    constructor() {
        super(DIFFICULTY_LEVELS.year2);
        this.symbol = '×';
    }

    generate() {
        // By the end of Year 2, children recall the 2, 5, and 10 times tables and related division facts
        // They can perform simple multiplications mentally when the numbers are drawn from those tables
        // They also learn that multiplication is commutative (e.g. 2 × 5 = 5 × 2)

        // Randomly choose between different types of Year 2 multiplication problems
        const problemType = this._getRandomInt(1, 4);

        let a, b, expression;

        switch (problemType) {
            case 1: // 2 times table (up to 2 × 10)
                a = this._getRandomInt(1, 10);
                b = 2;
                expression = `${a} ${this.symbol} ${b}`;
                break;

            case 2: // 5 times table (up to 5 × 10)
                a = this._getRandomInt(1, 10);
                b = 5;
                expression = `${a} ${this.symbol} ${b}`;
                break;

            case 3: // 10 times table (up to 10 × 10)
                a = this._getRandomInt(1, 10);
                b = 10;
                expression = `${a} ${this.symbol} ${b}`;
                break;

            case 4: // Commutative property (e.g., 2 × 5 = 5 × 2)
                // Choose between 2, 5, and 10 for one factor
                b = [2, 5, 10][this._getRandomInt(0, 2)];
                a = this._getRandomInt(1, 10);

                // Randomly decide whether to put the 2, 5, or 10 first or second
                if (this._getRandomInt(0, 1) === 0) {
                    expression = `${b} ${this.symbol} ${a}`;
                } else {
                    expression = `${a} ${this.symbol} ${b}`;
                }
                break;
        }

        this.problemDetails = {
            expression: expression,
            answer: a * b,
            operands: [a, b]
        };
    }
}