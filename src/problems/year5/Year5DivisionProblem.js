import BaseDivisionProblem from '../base/BaseDivisionProblem.js';
import { DIFFICULTY_LEVELS } from '../../difficulty/DifficultyLevel.js';

/**
 * Division problem for Year 5
 * @extends BaseDivisionProblem
 */
export default class Year5DivisionProblem extends BaseDivisionProblem {
    constructor() {
        super(DIFFICULTY_LEVELS.year5);
        this.symbol = '÷';
        this.generate()
    }

    generate() {
        // In Year 5, mental division involves larger dividends and leveraging number sense
        // Children find factor pairs and common factors to help divide
        // They identify multiples and use that to simplify divisions
        // They are expected to find all factor pairs of a number and common factors of two numbers
        // They also continue to use inverses and divide by 10, 100, 1000 using place-value shifting

        // Randomly choose between different types of Year 5 division problems
        const problemType = this._getRandomInt(1, 5);

        let a, b, expression;
        let expression_short = null;

        switch (problemType) {
            case 1: // Division using square number facts (e.g., 144 ÷ 12 = 12)
                // Use square numbers for easier mental calculation
                const squareNumbers = [
                    [36, 6], [49, 7], [64, 8], [81, 9],
                    [100, 10], [121, 11], [144, 12]
                ];
                const squarePair = squareNumbers[this._getRandomInt(0, squareNumbers.length - 1)];
                a = squarePair[0];
                b = squarePair[1];
                expression = `${a} ${this.symbol} ${b}`;
                break;

            case 2: // Division using known multiplication facts (e.g., 96 ÷ 6 = 16)
                // Choose numbers that can be divided mentally using known facts
                const factPairs = [
                    [96, 6], [96, 8], [96, 12],
                    [84, 6], [84, 7], [84, 12],
                    [72, 6], [72, 8], [72, 9],
                    [120, 6], [120, 8], [120, 10],
                    [150, 5], [150, 10], [150, 15]
                ];
                const pair = factPairs[this._getRandomInt(0, factPairs.length - 1)];
                a = pair[0];
                b = pair[1];
                expression = `${a} ${this.symbol} ${b}`;
                break;

            case 3: // Division by 10, 100, 1000 with decimals (e.g., 3.6 ÷ 10 = 0.36)
                b = [10, 100, 1000][this._getRandomInt(0, 2)];
                // Create a number that gives a clean decimal when divided
                if (b === 10) {
                    a = this._getRandomInt(1, 50) + this._getRandomDecimal(0.1, 0.9, 1);
                } else if (b === 100) {
                    a = this._getRandomInt(1, 20) + this._getRandomDecimal(0.01, 0.99, 2);
                } else { // b === 1000
                    a = this._getRandomInt(1, 10) + this._getRandomDecimal(0.001, 0.999, 3);
                }
                // Round to avoid floating point issues
                a = Math.round(a * 1000) / 1000;
                expression = `${a} ${this.symbol} ${b}`;
                break;

            case 4: // Division with factor pairs (e.g., 144 ÷ 16 = 9)
                // Choose numbers with multiple factors for mental division strategies
                const compositeNumbers = [
                    [144, 16], [144, 18], [144, 24],
                    [120, 15], [120, 20], [120, 24],
                    [180, 15], [180, 20], [180, 30],
                    [200, 20], [200, 25], [200, 40],
                    [160, 16], [160, 20], [160, 40]
                ];
                const compositePair = compositeNumbers[this._getRandomInt(0, compositeNumbers.length - 1)];
                a = compositePair[0];
                b = compositePair[1];
                expression = `${a} ${this.symbol} ${b}`;
                break;

            case 5: // Division with multiples of 10 (e.g., 450 ÷ 15 = 30)
                // Create problems where both dividend and answer are multiples of 10
                const tens = this._getRandomInt(1, 9) * 10;
                b = [6, 8, 9, 12, 15, 18, 20, 25][this._getRandomInt(0, 7)];
                a = tens * b;
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