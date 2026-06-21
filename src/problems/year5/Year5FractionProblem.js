import BaseFractionProblem from '../base/BaseFractionProblem.js';
import { DIFFICULTY_LEVELS } from '../../difficulty/DifficultyLevel.js';

/**
 * Fraction problem for Year 5: fraction operators, percentages and mixed numbers.
 * @extends BaseFractionProblem
 */
export default class Year5FractionProblem extends BaseFractionProblem {
    constructor() {
        super(DIFFICULTY_LEVELS.year5);
        this.generate();
    }

    generate() {
        const problemType = this._getRandomInt(1, 3);

        if (problemType === 2) {
            const items = [
                ['40%', '2/5', ['4/100', '1/4', '4/5']],
                ['25%', '1/4', ['1/25', '2/5', '1/5']],
                ['75%', '3/4', ['3/5', '1/4', '7/10']]
            ];
            const [percent, answer, distractors] = items[this._getRandomInt(0, items.length - 1)];
            this._choiceProblem({
                subtype: 'fraction_percentage_equivalence',
                expression: `Which fraction in simplest form is equal to ${percent}?`,
                expression_short: `${percent}=?`,
                answer,
                expectedAnswer: { kind: 'fractionString', value: answer },
                choices: this._uniqueChoices(answer, distractors)
            });
            return;
        }

        if (problemType === 3) {
            const denominator = [3, 4, 5, 6, 8][this._getRandomInt(0, 4)];
            const whole = this._getRandomInt(1, 2);
            const numerator = this._getRandomInt(1, denominator - 1);
            const improperNumerator = whole * denominator + numerator;
            const answer = `${whole} ${numerator}/${denominator}`;
            this._choiceProblem({
                subtype: 'mixed_improper_conversion',
                expression: `${improperNumerator}/${denominator} = ?`,
                expression_short: `${improperNumerator}/${denominator}=?`,
                answer,
                expectedAnswer: { kind: 'mixed', whole, numerator, denominator },
                choices: this._uniqueChoices(answer, [`${whole - 1} ${numerator}/${denominator}`, `${improperNumerator}/${numerator}`, `${whole} ${denominator - numerator}/${denominator}`])
            });
            return;
        }

        const denominator = [3, 4, 5, 8, 10][this._getRandomInt(0, 4)];
        const numerator = this._getRandomInt(2, denominator - 1);
        const quantity = denominator * this._getRandomInt(5, 20);
        this._makeQuantityProblem({
            numerator,
            denominator,
            quantity,
            subtype: 'fraction_of_amount_operator',
            wording: this._getRandomInt(0, 1) === 0 ? 'symbolic' : 'words'
        });
    }
}
