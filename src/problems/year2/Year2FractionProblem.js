import BaseFractionProblem from '../base/BaseFractionProblem.js';
import { DIFFICULTY_LEVELS } from '../../difficulty/DifficultyLevel.js';

/**
 * Fraction problem for Year 2: halves, thirds, quarters and simple equivalence.
 * @extends BaseFractionProblem
 */
export default class Year2FractionProblem extends BaseFractionProblem {
    constructor() {
        super(DIFFICULTY_LEVELS.year2);
        this.generate();
    }

    generate() {
        const problemType = this._getRandomInt(1, 3);

        if (problemType === 3) {
            this._choiceProblem({
                subtype: 'equivalent_fraction_simple',
                expression: 'Which fraction is equal to 1/2?',
                expression_short: '? = 1/2',
                answer: '2/4',
                expectedAnswer: { kind: 'fraction', numerator: 2, denominator: 4, equivalentTo: { numerator: 1, denominator: 2 } },
                choices: this._uniqueChoices('2/4', ['1/4', '3/4', '2/3'])
            });
            return;
        }

        const denominator = [2, 3, 4][this._getRandomInt(0, 2)];
        const numerator = denominator === 4 && problemType === 2 ? this._getRandomInt(2, 3) : 1;
        const maxMultiplier = denominator === 3 ? 10 : 12;
        const quantity = denominator * this._getRandomInt(2, maxMultiplier);

        this._makeQuantityProblem({
            numerator,
            denominator,
            quantity,
            subtype: numerator === 1 ? 'unit_fraction_of_quantity' : 'non_unit_quarters_of_quantity'
        });
    }
}
