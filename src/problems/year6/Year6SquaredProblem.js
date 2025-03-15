import BaseSquaredProblem from '../base/BaseSquaredProblem.js';
import { DIFFICULTY_LEVELS } from '../../difficulty/DifficultyLevel.js';

/**
 * Squared problem for Year 6
 * In Year 6, children recall square numbers up to 12² with ease and recognize them in various contexts.
 * They understand the relationship between square numbers and area.
 * @extends BaseSquaredProblem
 */
export default class Year6SquaredProblem extends BaseSquaredProblem {

    constructor() {
        super(DIFFICULTY_LEVELS.year6);
        this.generate()
    }

    generate() {
        // In Year 6, children recall square numbers up to 12² with ease
        // They recognize square numbers in various contexts
        // Some may even explore squares beyond 12 (e.g. 13² = 169)
        // They understand the relationship between square numbers and area

        // Randomly choose between different types of Year 6 squared problems
        const problemType = this._getRandomInt(1, 4);

        let a, expression, expression_short;

        switch (problemType) {
            case 1: // Basic square numbers with squared notation (e.g., 7² = 49)
                // Include all squares 1-12, with some emphasis on the harder ones
                const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 15];
                const weights = [1, 1, 1, 1, 1, 2, 2, 2, 2, 1, 2, 2, 1, 1]; // Include some beyond 12

                // Weighted random selection
                let totalWeight = weights.reduce((a, b) => a + b, 0);
                let randomWeight = this._getRandomInt(1, totalWeight);
                let cumulativeWeight = 0;

                for (let i = 0; i < values.length; i++) {
                    cumulativeWeight += weights[i];
                    if (randomWeight <= cumulativeWeight) {
                        a = values[i];
                        break;
                    }
                }

                // Use squared notation
                expression = `${a}²`;
                break;

            case 2: // Find the square root (e.g., "What number squared equals 81?")
                // Include all common square numbers, including some beyond 12²
                const squareNumbers = [4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144, 169, 225];
                const squareValue = squareNumbers[this._getRandomInt(0, squareNumbers.length - 1)];

                // Format as a square root problem
                expression = `√${squareValue}`;
                a = Math.sqrt(squareValue);
                break;

            case 3: // Area problems using squares (e.g., "Area of a 10×10 square")
                // Choose a side length between 3 and 15
                a = this._getRandomInt(3, 15);

                // Format as an area problem
                expression = `${a} × ${a}`;
                expression_short = `${a}×${a}`;
                break;

            case 4: // Identify if a number is a square (e.g., "Is 64 a square number?")
                // For this type, we'll just present a square number
                // The UI doesn't support true/false questions, so we'll just use the square root format
                const perfectSquares = [16, 25, 36, 49, 64, 81, 100, 121, 144, 169];
                const perfectSquare = perfectSquares[this._getRandomInt(0, perfectSquares.length - 1)];

                // Format as a square root problem
                expression = `√${perfectSquare}`;
                a = Math.sqrt(perfectSquare);
                break;
        }

        this.problemDetails = {
            expression: expression,
            expression_short: expression_short,
            answer: a * a,
            operands: [a]
        };
    }
}
