import BaseMultiplicationProblem from '../base/BaseMultiplicationProblem.js';
import { DIFFICULTY_LEVELS } from '../../difficulty/DifficultyLevel.js';

/**
 * Multiplication problem for Year 4 (focused on all times tables up to 12 × 12)
 * @extends BaseMultiplicationProblem
 */
export default class Year4MultiplicationProblem extends BaseMultiplicationProblem {

    constructor() {
        super(DIFFICULTY_LEVELS.year4);
        this.symbol = '×';
    }

    generate() {
        // A major Year 4 milestone is to know all multiplication facts up to 12 × 12
        // By the end of Year 4, children should be fluent in all times tables (2–12)
        // They also apply these facts in mental strategies: understanding the effect of multiplying by 0 or 1
        // They can double any two-digit number in their head (which is 2× that number)

        // Randomly choose between different types of Year 4 multiplication problems
        const problemType = this._getRandomInt(1, 5);

        let a, b, expression;

        switch (problemType) {
            case 1: // Times tables 6, 7, 9, 11, 12 (the more challenging ones)
                b = [6, 7, 9, 11, 12][this._getRandomInt(0, 4)];
                a = this._getRandomInt(2, 12); // Start from 2 to avoid trivial 1×b
                // Avoid trivial multiplications by 10
                if (a === 10) {
                    a = [8, 9, 11, 12][this._getRandomInt(0, 3)];
                }
                expression = `${a} ${this.symbol} ${b}`;
                break;

            case 2: // Multiplying by 0 or 1 (understanding the effect)
                b = [0, 1][this._getRandomInt(0, 1)];
                a = this._getRandomInt(2, 12);
                expression = `${a} ${this.symbol} ${b}`;
                break;

            case 3: // Double a two-digit number (e.g., 2 × 34)
                a = 2;
                b = this._getRandomInt(13, 50);
                expression = `${a} ${this.symbol} ${b}`;
                break;

            case 4: // Multiply a teen number by a single digit (e.g., 14 × 6)
                a = this._getRandomInt(13, 19);
                b = this._getRandomInt(3, 9);
                expression = `${a} ${this.symbol} ${b}`;
                break;

            case 5: // Multiply multiples of 10 by a single digit (e.g., 30 × 7)
                a = this._getRandomInt(2, 9) * 10;
                b = this._getRandomInt(3, 9);
                // Avoid trivial multiplications
                if (b === 1) {
                    b = 7;
                }
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