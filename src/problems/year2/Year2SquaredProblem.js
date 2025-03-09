import BaseSquaredProblem from '../base/BaseSquaredProblem.js';
import { DIFFICULTY_LEVELS } from '../../difficulty/DifficultyLevel.js';

/**
 * Squared problem for Year 2
 * Note: Squaring is not formally taught in Year 2 according to the UK National Curriculum.
 * This implementation provides simple squaring of numbers 1-5 that might be encountered
 * through multiplication practice, but not as a formal concept of "square numbers."
 * @extends BaseSquaredProblem
 */
export default class Year2SquaredProblem extends BaseSquaredProblem {

    constructor() {
        super(DIFFICULTY_LEVELS.year2);
    }

    generate() {
        // Squaring is still not formally taught in Year 2
        // Children might encounter cases like 2×2, 5×5 through multiplication practice
        // but they won't yet be asked to identify "square numbers" as a concept

        // Use values 1-5 as these might be encountered in multiplication practice
        const a = this._getRandomInt(1, 5);

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