import BaseMathProblem from './BaseMathProblem.js';

/**
 * Base class for fraction problems.
 * @extends BaseMathProblem
 */
export default class BaseFractionProblem extends BaseMathProblem {
    constructor(difficultyLevel) {
        super(difficultyLevel);
        this.type = 'fraction';
    }

    generate() {
        throw new Error('BaseFractionProblem.generate() must be implemented by subclasses');
    }

    _setProblemDetails(details) {
        this.problemDetails = {
            ...details,
            formattedAnswer: details.formattedAnswer ?? this._formatAnswer(details.answer)
        };
    }

    get formattedAnswer() {
        return this.problemDetails?.formattedAnswer ?? this._formatAnswer(this.answer);
    }

    _formatAnswer(answer) {
        if (typeof answer === 'number') {
            return this._formatNumber(answer);
        }
        return String(answer);
    }

    _fraction(numerator, denominator) {
        return `${numerator}/${denominator}`;
    }

    _simplify(numerator, denominator) {
        const divisor = this._gcd(Math.abs(numerator), Math.abs(denominator));
        return {
            numerator: numerator / divisor,
            denominator: denominator / divisor
        };
    }

    _gcd(a, b) {
        while (b !== 0) {
            const remainder = a % b;
            a = b;
            b = remainder;
        }
        return a || 1;
    }

    _makeQuantityProblem({ numerator, denominator, quantity, subtype, wording = 'symbolic' }) {
        const answer = quantity / denominator * numerator;
        const fraction = this._fraction(numerator, denominator);
        const expression = wording === 'words'
            ? `${this._fractionWords(numerator, denominator)} of ${quantity}`
            : `${fraction} of ${quantity}`;

        this._setProblemDetails({
            subtype,
            expression,
            expression_short: `${fraction} of ${quantity}`,
            answer,
            operands: [numerator, denominator, quantity],
            expectedAnswer: { kind: 'integer', value: answer },
            distractors: this._quantityDistractors(numerator, denominator, quantity, answer)
        });
    }

    _quantityDistractors(numerator, denominator, quantity, answer) {
        const unitFraction = quantity / denominator;
        const divideByNumerator = numerator === 0 ? quantity : quantity / numerator;
        const complement = quantity - answer;
        return [
            unitFraction,
            divideByNumerator,
            denominator,
            numerator,
            quantity,
            complement,
            answer + denominator,
            answer - denominator
        ].filter((value) => Number.isFinite(value) && value >= 0);
    }

    _choiceProblem({ subtype, expression, expression_short, answer, choices, expectedAnswer }) {
        this._setProblemDetails({
            subtype,
            expression,
            expression_short,
            answer,
            operands: [],
            choices,
            expectedAnswer
        });
    }

    _fractionWords(numerator, denominator) {
        const denominatorWords = {
            2: numerator === 1 ? 'half' : 'halves',
            3: numerator === 1 ? 'third' : 'thirds',
            4: numerator === 1 ? 'quarter' : 'quarters',
            5: numerator === 1 ? 'fifth' : 'fifths',
            6: numerator === 1 ? 'sixth' : 'sixths',
            8: numerator === 1 ? 'eighth' : 'eighths',
            10: numerator === 1 ? 'tenth' : 'tenths'
        };
        const numeratorWords = {
            1: 'one',
            2: 'two',
            3: 'three',
            4: 'four',
            5: 'five',
            6: 'six',
            7: 'seven',
            8: 'eight',
            9: 'nine'
        };

        if (numerator === 1 && denominator === 2) {
            return 'half';
        }

        const numeratorWord = numeratorWords[numerator] ?? String(numerator);
        const denominatorWord = denominatorWords[denominator] ?? `${denominator}ths`;
        return `${numeratorWord} ${denominatorWord}`;
    }

    _shuffle(values) {
        const shuffled = [...values];
        for (let index = shuffled.length - 1; index > 0; index -= 1) {
            const swapIndex = this._getRandomInt(0, index);
            [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
        }
        return shuffled;
    }

    _uniqueChoices(correct, distractors, count = 4) {
        const choices = new Set([String(correct)]);
        for (const distractor of distractors) {
            choices.add(String(distractor));
            if (choices.size >= count) {
                break;
            }
        }
        const fallbackChoices = ['1/2', '1/3', '1/4', '2/3', '3/4', '4/5', '0.5', '0.25', 'They are equal'];
        for (const fallbackChoice of fallbackChoices) {
            if (choices.size >= count) {
                break;
            }
            choices.add(fallbackChoice);
        }
        return this._shuffle([...choices]);
    }
}
