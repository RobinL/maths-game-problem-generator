import BaseFractionProblem from '../base/BaseFractionProblem.js';
import { DIFFICULTY_LEVELS } from '../../difficulty/DifficultyLevel.js';

/**
 * Fraction problem for Year 4: non-unit fractions, tenths and decimal equivalence.
 * @extends BaseFractionProblem
 */
export default class Year4FractionProblem extends BaseFractionProblem {
    constructor() {
        super(DIFFICULTY_LEVELS.year4);
        this.generate();
    }

    generate() {
        const problemType = this._getRandomInt(1, 4);

        if (problemType === 3) {
            const items = [
                ['1/2', '0.5', ['0.2', '0.05', '2']],
                ['1/4', '0.25', ['0.4', '0.14', '25']],
                ['3/4', '0.75', ['0.34', '0.3', '75']]
            ];
            const [fraction, answer, distractors] = items[this._getRandomInt(0, items.length - 1)];
            this._choiceProblem({
                subtype: 'fraction_decimal_equivalence_basic',
                expression: `${fraction} = ?`,
                expression_short: `${fraction}=?`,
                answer,
                expectedAnswer: { kind: 'decimal', value: Number(answer) },
                choices: this._uniqueChoices(answer, distractors)
            });
            return;
        }

        if (problemType === 4) {
            const denominator = [5, 8, 10][this._getRandomInt(0, 2)];
            const first = this._getRandomInt(2, denominator - 2);
            const second = this._getRandomInt(1, first - 1);
            const answer = `${first - second}/${denominator}`;
            this._choiceProblem({
                subtype: 'subtract_same_denominator',
                expression: `${first}/${denominator} - ${second}/${denominator}`,
                expression_short: `${first}/${denominator}-${second}/${denominator}`,
                answer,
                expectedAnswer: { kind: 'fraction', numerator: first - second, denominator },
                choices: this._uniqueChoices(answer, [`${first - second}/${denominator * 2}`, `${first + second}/${denominator}`, `${second}/${denominator}`])
            });
            return;
        }

        const denominator = problemType === 2 ? 10 : [3, 4, 5, 8][this._getRandomInt(0, 3)];
        const numerator = this._getRandomInt(2, denominator - 1);
        const quantity = denominator * this._getRandomInt(3, denominator === 10 ? 12 : 10);
        this._makeQuantityProblem({
            numerator,
            denominator,
            quantity,
            subtype: denominator === 10 ? 'tenths_of_quantity' : 'non_unit_fraction_of_quantity'
        });
    }
}
