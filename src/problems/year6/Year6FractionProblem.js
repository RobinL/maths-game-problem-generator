import BaseFractionProblem from '../base/BaseFractionProblem.js';
import { DIFFICULTY_LEVELS } from '../../difficulty/DifficultyLevel.js';

/**
 * Fraction problem for Year 6: simplify, compare and operate on fractions.
 * @extends BaseFractionProblem
 */
export default class Year6FractionProblem extends BaseFractionProblem {
    constructor() {
        super(DIFFICULTY_LEVELS.year6);
        this.generate();
    }

    generate() {
        const problemType = this._getRandomInt(1, 4);

        if (problemType === 1) {
            const baseNumerator = this._getRandomInt(2, 5);
            const baseDenominator = baseNumerator + this._getRandomInt(2, 6);
            const multiplier = this._getRandomInt(2, 4);
            const numerator = baseNumerator * multiplier;
            const denominator = baseDenominator * multiplier;
            const simplified = this._simplify(numerator, denominator);
            const answer = this._fraction(simplified.numerator, simplified.denominator);
            this._choiceProblem({
                subtype: 'simplify_fraction',
                expression: `Simplify ${numerator}/${denominator}`,
                expression_short: `simp ${numerator}/${denominator}`,
                answer,
                expectedAnswer: { kind: 'fraction', numerator: simplified.numerator, denominator: simplified.denominator },
                choices: this._uniqueChoices(answer, [`${numerator / multiplier}/${denominator}`, `${numerator}/${denominator / multiplier}`, `${simplified.denominator}/${simplified.numerator}`])
            });
            return;
        }

        if (problemType === 2) {
            const pairs = [
                ['5/6', '7/11', '5/6'],
                ['3/4', '5/8', '3/4'],
                ['4/9', '3/7', '4/9']
            ];
            const [first, second, answer] = pairs[this._getRandomInt(0, pairs.length - 1)];
            this._choiceProblem({
                subtype: 'compare_fractions_unlike_denominators',
                expression: `Which is greater: ${first} or ${second}?`,
                expression_short: `${first} >? ${second}`,
                answer,
                expectedAnswer: { kind: 'fractionString', value: answer },
                choices: this._uniqueChoices(answer, [first === answer ? second : first, 'They are equal', '1/2'])
            });
            return;
        }

        if (problemType === 3) {
            const firstDenominator = [3, 4, 5][this._getRandomInt(0, 2)];
            const secondDenominator = [2, 3, 4][this._getRandomInt(0, 2)];
            const firstNumerator = this._getRandomInt(1, firstDenominator - 1);
            const secondNumerator = this._getRandomInt(1, secondDenominator - 1);
            const answerRaw = this._simplify(firstNumerator * secondNumerator, firstDenominator * secondDenominator);
            const answer = this._fraction(answerRaw.numerator, answerRaw.denominator);
            this._choiceProblem({
                subtype: 'multiply_fraction_by_fraction',
                expression: `${firstNumerator}/${firstDenominator} × ${secondNumerator}/${secondDenominator}`,
                expression_short: `${firstNumerator}/${firstDenominator}x${secondNumerator}/${secondDenominator}`,
                answer,
                expectedAnswer: { kind: 'fraction', numerator: answerRaw.numerator, denominator: answerRaw.denominator },
                choices: this._uniqueChoices(answer, [`${firstNumerator + secondNumerator}/${firstDenominator + secondDenominator}`, `${firstNumerator * secondNumerator}/${firstDenominator + secondDenominator}`, `${firstNumerator}/${firstDenominator * secondDenominator}`])
            });
            return;
        }

        const denominator = [3, 4, 5, 8, 10][this._getRandomInt(0, 4)];
        const numerator = this._getRandomInt(2, denominator - 1);
        const quantity = denominator * this._getRandomInt(8, 30);
        this._makeQuantityProblem({
            numerator,
            denominator,
            quantity,
            subtype: 'fraction_of_amount_operator'
        });
    }
}
