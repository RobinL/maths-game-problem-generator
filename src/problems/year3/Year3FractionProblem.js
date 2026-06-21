import BaseFractionProblem from '../base/BaseFractionProblem.js';
import { DIFFICULTY_LEVELS } from '../../difficulty/DifficultyLevel.js';

/**
 * Fraction problem for Year 3: unit fractions, comparison and same-denominator addition.
 * @extends BaseFractionProblem
 */
export default class Year3FractionProblem extends BaseFractionProblem {
    constructor() {
        super(DIFFICULTY_LEVELS.year3);
        this.generate();
    }

    generate() {
        const problemType = this._getRandomInt(1, 3);

        if (problemType === 2) {
            const pair = [[5, 4], [10, 8], [8, 4]][this._getRandomInt(0, 2)];
            const answer = `1/${Math.min(...pair)}`;
            this._choiceProblem({
                subtype: 'compare_unit_fractions',
                expression: `Which is bigger: 1/${pair[0]} or 1/${pair[1]}?`,
                expression_short: `1/${pair[0]} >? 1/${pair[1]}`,
                answer,
                expectedAnswer: { kind: 'fractionString', value: answer },
                choices: this._uniqueChoices(answer, [`1/${Math.max(...pair)}`, 'They are equal', '2/5'])
            });
            return;
        }

        if (problemType === 3) {
            const denominator = [5, 7, 8, 10][this._getRandomInt(0, 3)];
            const first = this._getRandomInt(1, Math.floor((denominator - 1) / 2));
            const second = this._getRandomInt(1, denominator - first - 1);
            const answer = `${first + second}/${denominator}`;
            this._choiceProblem({
                subtype: 'add_same_denominator',
                expression: `${first}/${denominator} + ${second}/${denominator}`,
                expression_short: `${first}/${denominator}+${second}/${denominator}`,
                answer,
                expectedAnswer: { kind: 'fraction', numerator: first + second, denominator },
                choices: this._uniqueChoices(answer, [`${first + second}/${denominator * 2}`, `${first * second}/${denominator}`, `${Math.max(first, second)}/${denominator}`])
            });
            return;
        }

        const denominator = [2, 4, 5, 8, 10, 3][this._getRandomInt(0, 5)];
        const quantity = denominator === 4 && this._getRandomInt(0, 4) === 0
            ? 100
            : denominator * this._getRandomInt(3, denominator === 10 ? 12 : 10);
        this._makeQuantityProblem({
            numerator: 1,
            denominator,
            quantity,
            subtype: 'unit_fraction_of_quantity_extended'
        });
    }
}
