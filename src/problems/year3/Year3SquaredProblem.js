import BaseSquaredProblem from '../base/BaseSquaredProblem.js';
import { DIFFICULTY_LEVELS } from '../../difficulty/DifficultyLevel.js';

/**
 * Squared problem for Year 3
 * Note: Squaring is not formally taught as a concept in Year 3 according to the UK National Curriculum.
 * However, students know some squares through their times tables (e.g., 3×3=9, 4×4=16, 8×8=64).
 * This implementation provides simple squaring that might be encountered through multiplication practice.
 * @extends BaseSquaredProblem
 */
export default class Year3SquaredProblem extends BaseSquaredProblem {

    constructor() {
        super(DIFFICULTY_LEVELS.year3);
        this.generate()
    }

    generate() {
        // Squaring is informally within reach because students know some squares through their tables
        // However, Year 3 does not explicitly teach the concept of "square numbers"
        // Children at this stage won't be asked to list square numbers, but they can compute a few if needed

        // Use values 1-8 as these might be encountered in multiplication practice
        // Focus especially on 3, 4, and 8 which are new times tables in Year 3
        const values = [1, 2, 3, 4, 5, 6, 7, 8];
        const weights = [1, 1, 3, 3, 1, 1, 1, 3]; // Higher weights for 3, 4, and 8

        // Weighted random selection
        let totalWeight = weights.reduce((a, b) => a + b, 0);
        let randomWeight = this._getRandomInt(1, totalWeight);
        let cumulativeWeight = 0;
        let a = 1; // Default value

        for (let i = 0; i < values.length; i++) {
            cumulativeWeight += weights[i];
            if (randomWeight <= cumulativeWeight) {
                a = values[i];
                break;
            }
        }

        // Format as multiplication rather than using squared notation
        // since that's how children would encounter it at this stage
        const expression = `${a} × ${a}`;

        this.problemDetails = {
            expression: expression,
            answer: a * a,
            operands: [a]
        };
    }
}