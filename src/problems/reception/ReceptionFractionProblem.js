import BaseFractionProblem from '../base/BaseFractionProblem.js';
import { DIFFICULTY_LEVELS } from '../../difficulty/DifficultyLevel.js';

/**
 * Fraction-adjacent Reception problem: equal sharing and informal halving.
 * @extends BaseFractionProblem
 */
export default class ReceptionFractionProblem extends BaseFractionProblem {
    constructor() {
        super(DIFFICULTY_LEVELS.reception);
        this.generate();
    }

    generate() {
        const quantity = this._getRandomInt(1, 5) * 2;
        const useHalfWording = this._getRandomInt(0, 1) === 1;

        if (useHalfWording) {
            this._makeQuantityProblem({
                numerator: 1,
                denominator: 2,
                quantity,
                subtype: 'half_of_quantity',
                wording: 'words'
            });
            return;
        }

        const answer = quantity / 2;
        this._setProblemDetails({
            subtype: 'equal_share_two_groups',
            expression: `Share ${quantity} equally between 2`,
            expression_short: `${quantity} shared 2`,
            answer,
            operands: [quantity, 2],
            expectedAnswer: { kind: 'integer', value: answer },
            distractors: [2, quantity, quantity - answer, answer + 1, answer - 1]
        });
    }
}
