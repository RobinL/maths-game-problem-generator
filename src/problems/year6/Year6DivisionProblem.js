import BaseDivisionProblem from '../base/BaseDivisionProblem.js';
import { DIFFICULTY_LEVELS } from '../../difficulty/DifficultyLevel.js';

/**
 * Division problem for Year 6
 * @extends BaseDivisionProblem
 */
export default class Year6DivisionProblem extends BaseDivisionProblem {
    constructor() {
        super(DIFFICULTY_LEVELS.year6);
        this.symbol = '÷';
        this.generate()
    }

    generate() {
        // In Year 6, mental division involves using all the techniques accumulated so far
        // Students identify primes, factors, and multiples to simplify divisions
        // They might break a division into steps (e.g., 360 ÷ 24 = 360 ÷ 6 ÷ 4 = 60 ÷ 4 = 15)
        // They comfortably divide decimals by 10, 100, 1000 mentally
        // They reason through problems with remainders or fractional results

        // Randomly choose between different types of Year 6 division problems
        const problemType = this._getRandomInt(1, 5);

        let a, b, expression;
        let expression_short = null;

        switch (problemType) {
            case 1: // Division using known facts (e.g., 84 ÷ 7 = 12)
                // Use times table facts for clean division
                b = this._getRandomInt(3, 12);
                a = b * this._getRandomInt(7, 15);
                expression = `${a} ${this.symbol} ${b}`;
                break;

            case 2: // Multi-step division (e.g., 360 ÷ 6 = 60)
                // Create problems where the division can be broken down into steps
                const multiStepPairs = [
                    [360, 6], [360, 9], [360, 12], [360, 18],
                    [420, 6], [420, 7], [420, 10], [420, 14],
                    [480, 6], [480, 8], [480, 12], [480, 16],
                    [540, 6], [540, 9], [540, 12], [540, 18]
                ];
                const multiStepPair = multiStepPairs[this._getRandomInt(0, multiStepPairs.length - 1)];
                a = multiStepPair[0];
                b = multiStepPair[1];
                expression = `${a} ${this.symbol} ${b}`;
                break;

            case 3: // Divide decimals by powers of 10 (e.g., 2.4 ÷ 100 = 0.024)
                // Create decimal numbers that divide cleanly by powers of 10
                a = this._getRandomInt(1, 99) / 10;
                if (this._getRandomInt(0, 1) === 1) {
                    a = this._getRandomInt(10, 99) / 10; // Sometimes use larger decimals
                }
                b = [10, 100, 1000][this._getRandomInt(0, 2)];
                expression = `${a} ${this.symbol} ${b}`;
                break;

            case 4: // Division with two-digit divisors (e.g., 360 ÷ 24 = 15)
                // Choose problems where the division can be broken into steps
                const twoDigitDivisorPairs = [
                    [360, 24], [360, 36], [360, 45], [360, 60],
                    [480, 24], [480, 32], [480, 40], [480, 48],
                    [600, 24], [600, 30], [600, 40], [600, 50],
                    [720, 24], [720, 36], [720, 45], [720, 60]
                ];
                const twoDigitPair = twoDigitDivisorPairs[this._getRandomInt(0, twoDigitDivisorPairs.length - 1)];
                a = twoDigitPair[0];
                b = twoDigitPair[1];
                expression = `${a} ${this.symbol} ${b}`;
                break;

            case 5: // Division with decimal results (e.g., 1 ÷ 4 = 0.25)
                // Choose problems that give clean decimal results
                const decimalResultPairs = [
                    [1, 4], [1, 5], [1, 8], [1, 10],
                    [2, 5], [2, 8], [2, 10], [2, 20],
                    [3, 4], [3, 10], [3, 20], [3, 25],
                    [5, 2], [5, 4], [5, 8], [5, 20]
                ];
                const decimalPair = decimalResultPairs[this._getRandomInt(0, decimalResultPairs.length - 1)];
                a = decimalPair[0];
                b = decimalPair[1];
                expression = `${a} ${this.symbol} ${b}`;
                break;
        }

        // Assign problemDetails after the switch, ensuring it always happens
        this.problemDetails = {
            expression: expression,
            // Conditionally add expression_short only if it was set
            ...(expression_short && { expression_short: expression_short }),
            answer: a / b,
            operands: [a, b]
        };
    }
}