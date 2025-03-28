import BaseSquaredProblem from '../base/BaseSquaredProblem.js';
import { DIFFICULTY_LEVELS } from '../../difficulty/DifficultyLevel.js';

/**
 * Squared problem for Year 5
 * Year 5 formally introduces square numbers. Pupils learn to recognize and use square numbers
 * and the squared symbol. They are expected to know the squares of integers 1 through 12 by heart.
 * @extends BaseSquaredProblem
 */
export default class Year5SquaredProblem extends BaseSquaredProblem {
    constructor() {
        super(DIFFICULTY_LEVELS.year5);
        this.generate()
    }

    generate() {
        // Year 5 formally introduces square numbers
        // Pupils learn to recognize and use square numbers (and the squared symbol)
        // They are expected to know the squares of integers 1 through 12 by heart
        // The difficulty level here is memorization and quick recall of these specific products

        // Randomly choose between different types of Year 5 squared problems
        const problemType = this._getRandomInt(1, 3);

        let a, expression, answer;
        let expression_short = null;

        switch (problemType) {
            case 1: // Basic square numbers with squared notation (e.g., 6² = 36)
                // Focus on the full range of squares 1-12, with emphasis on 6-12
                const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
                const weights = [1, 1, 1, 1, 1, 2, 2, 2, 2, 1, 2, 2]; // Higher weights for 6-12 (except 10)
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
                // Avoid trivial squares like 1² and 10²
                if (a === 1 || a === 10) {
                    a = [6, 7, 8, 9, 11, 12][this._getRandomInt(0, 5)];
                }
                // Use squared notation as it's formally introduced in Year 5
                expression = `${a}²`;
                answer = a * a; // For squared problems, answer is a²
                break;

            case 2: // Find the square root (e.g., "What number squared equals 81?")
                // Choose from common square numbers that students should recognize
                const squareNumbers = [4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144];
                const squareValue = squareNumbers[this._getRandomInt(0, squareNumbers.length - 1)];
                // Format as a "what number squared" problem
                expression = `√${squareValue}`;
                a = Math.sqrt(squareValue);
                answer = a; // For square root problems, answer is √n = a
                break;

            case 3: // Area problems implicitly using squares (e.g., "Area of a 7×7 square")
                // Choose a side length between 3 and 12
                a = this._getRandomInt(3, 12);
                // Format as an area problem
                expression = `${a} × ${a}`;
                expression_short = `${a}×${a}`;
                answer = a * a; // For area problems, answer is a²
                break;
        }

        // Assign problemDetails ensuring it always happens
        this.problemDetails = {
            expression: expression,
            // Conditionally add expression_short only if it was set
            ...(expression_short && { expression_short: expression_short }),
            answer: answer,
            operands: [a]
        };
    }
}