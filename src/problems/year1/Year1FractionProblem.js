import BaseFractionProblem from '../base/BaseFractionProblem.js';
import { DIFFICULTY_LEVELS } from '../../difficulty/DifficultyLevel.js';

/**
 * Fraction problem for Year 1: halves and quarters of quantities.
 * @extends BaseFractionProblem
 */
export default class Year1FractionProblem extends BaseFractionProblem {
    constructor() {
        super(DIFFICULTY_LEVELS.year1);
        this.generate();
    }

    generate() {
        const denominator = this._getRandomInt(0, 1) === 0 ? 2 : 4;
        const quantity = denominator * this._getRandomInt(2, denominator === 2 ? 10 : 5);

        this._makeQuantityProblem({
            numerator: 1,
            denominator,
            quantity,
            subtype: denominator === 2 ? 'half_of_quantity' : 'quarter_of_quantity',
            wording: 'words'
        });
    }
}
