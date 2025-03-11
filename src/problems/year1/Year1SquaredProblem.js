import BaseSquaredProblem from '../base/BaseSquaredProblem.js';
import { DIFFICULTY_LEVELS } from '../../difficulty/DifficultyLevel.js';

/**
 * Squared problem for Year 1
 * Note: Squaring is not formally taught in Year 1 according to the UK National Curriculum.
 * This implementation provides very simple squaring of 1 and 2 only, as these might be
 * encountered incidentally during multiplication practice.
 * @extends BaseSquaredProblem
 */
export default class Year1SquaredProblem extends BaseSquaredProblem {

    constructor() {
        super(DIFFICULTY_LEVELS.year1);
        this.generate()
    }

    generate() {
        // Squaring is not formally taught in Year 1
        // Children might encounter cases like 2×2 through multiplication practice
        // but they won't yet identify "square numbers" as a concept

        // Only use 1 or 2 as these are the only values that might be encountered
        const a = this._getRandomInt(1, 2);

        // Format as multiplication rather than using squared notation
        // since that's how children would encounter it
        const expression = `${a} × ${a}`;

        this.problemDetails = {
            expression: expression,
            answer: a * a,
            operands: [a]
        };
    }
}