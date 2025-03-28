import BaseSquaredProblem from '../base/BaseSquaredProblem.js';
import { DIFFICULTY_LEVELS } from '../../difficulty/DifficultyLevel.js';

/**
 * Squared problem for Year 4
 * Note: The term "square number" may still not be formally emphasized in Year 4, but practically
 * students have encountered all squares up to 12² through their times tables.
 * @extends BaseSquaredProblem
 */
export default class Year4SquaredProblem extends BaseSquaredProblem {
    constructor() {
        super(DIFFICULTY_LEVELS.year4);
        this.generate()
    }

    generate() {
        // The term "square number" may still not be formally emphasized in Year 4
        // But practically students have encountered all squares up to 12² through their times tables
        // They can compute these products mentally
        // For instance, they will know 6 × 6 = 36 and 11 × 11 = 121 as part of multiplication fluency

        let a, expression;
        let expression_short = null;

        // Use values 1-12 as these are encountered in multiplication practice in Year 4
        // Focus especially on 6-12 which are the more challenging squares
        const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        const weights = [1, 1, 1, 1, 1, 2, 2, 2, 2, 1, 2, 2]; // Higher weights for 6-12 (except 10)

        // Weighted random selection
        let totalWeight = weights.reduce((a, b) => a + b, 0);
        let randomWeight = this._getRandomInt(1, totalWeight);
        let cumulativeWeight = 0;
        a = 1; // Default value

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

        // Format as multiplication rather than using squared notation
        // since that's how children would encounter it at this stage
        expression = `${a} × ${a}`;

        // Assign problemDetails ensuring it always happens
        this.problemDetails = {
            expression: expression,
            // Conditionally add expression_short only if it was set
            ...(expression_short && { expression_short: expression_short }),
            answer: a * a,
            operands: [a]
        };
    }
}