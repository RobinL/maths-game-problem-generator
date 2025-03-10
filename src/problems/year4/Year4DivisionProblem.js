import BaseDivisionProblem from '../base/BaseDivisionProblem.js';
import { DIFFICULTY_LEVELS } from '../../difficulty/DifficultyLevel.js';

/**
 * Division problem for Year 4 (focused on division facts from all times tables up to 12 × 12)
 * @extends BaseDivisionProblem
 */
export default class Year4DivisionProblem extends BaseDivisionProblem {

    constructor() {
        super(DIFFICULTY_LEVELS.year4);
        this.symbol = '÷';
    }

    generate() {
        // With mastery of tables to 12×12, Year 4 students can mentally divide using those facts
        // They recognize factor pairs for numbers (e.g. factors of 48 are 6 and 8, so 48 ÷ 6 = 8)
        // They comfortably handle divisions like 81 ÷ 9 = 9 or 72 ÷ 8 = 9 in their heads
        // They also know dividing by 1 leaves a number unchanged

        // Randomly choose between different types of Year 4 division problems
        const problemType = this._getRandomInt(1, 5);

        let a, b, expression;

        switch (problemType) {
            case 1: // Division using 6, 7, 9, 11, 12 times tables (the more challenging ones)
                b = [6, 7, 9, 11, 12][this._getRandomInt(0, 4)];
                a = b * this._getRandomInt(2, 12); // Ensure divisible by b
                // Avoid trivial divisions where a is just 1×b
                if (a === b) {
                    a = b * this._getRandomInt(2, 12);
                }
                expression = `${a} ${this.symbol} ${b}`;
                break;

            case 2: // Division by 1 (understanding the effect)
                b = 1;
                a = this._getRandomInt(2, 100);
                expression = `${a} ${this.symbol} ${b}`;
                break;

            case 3: // Division of multiples of 10 by a single digit (e.g., 60 ÷ 3)
                a = this._getRandomInt(2, 9) * 10;
                // Ensure a is divisible by b
                const possibleDivisors = [];
                for (let i = 2; i <= 9; i++) {
                    if (a % i === 0) {
                        possibleDivisors.push(i);
                    }
                }
                if (possibleDivisors.length === 0) {
                    // If no divisors found, default to a simple case
                    a = 60;
                    b = 3;
                } else {
                    b = possibleDivisors[this._getRandomInt(0, possibleDivisors.length - 1)];
                }
                expression = `${a} ${this.symbol} ${b}`;
                break;

            case 4: // Division with remainders (e.g., 37 ÷ 5 = 7 remainder 2)
                b = this._getRandomInt(2, 9);
                // Create a number that gives a remainder when divided by b
                const quotient = this._getRandomInt(2, 12);
                const remainder = this._getRandomInt(1, b - 1);
                a = b * quotient + remainder;
                expression = `${a} ${this.symbol} ${b}`;
                break;

            case 5: // Factor pairs (e.g., 48 ÷ 6 = 8, where 6 and 8 are factors of 48)
                // Choose a number with multiple factors
                const compositeNumbers = [24, 36, 48, 60, 72, 84, 96, 108, 120, 144];
                a = compositeNumbers[this._getRandomInt(0, compositeNumbers.length - 1)];

                // Find all factors of a
                const factors = [];
                for (let i = 2; i <= Math.sqrt(a); i++) {
                    if (a % i === 0) {
                        factors.push(i);
                        if (i !== a / i) {
                            factors.push(a / i);
                        }
                    }
                }

                // Choose a factor as divisor
                b = factors[this._getRandomInt(0, factors.length - 1)];
                expression = `${a} ${this.symbol} ${b}`;
                break;
        }

        this.problemDetails = {
            expression: expression,
            answer: a / b,
            operands: [a, b]
        };
    }
}