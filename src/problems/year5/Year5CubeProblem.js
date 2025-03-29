import BaseCubeProblem from '../base/BaseCubeProblem.js';
import { DIFFICULTY_LEVELS } from '../../difficulty/DifficultyLevel.js';

/**
 * Cube problem for Year 5. Focuses on calculating n³ for small integer bases
 * as per curriculum introduction. Does not include cube roots for mental recall yet.
 * @extends BaseCubeProblem
 */
export default class Year5CubeProblem extends BaseCubeProblem {
    constructor() {
        super(DIFFICULTY_LEVELS.year5);
        this.generate();
    }

    generate() {
        // Year 5 curriculum focuses on recognizing and using cube numbers for bases 1-5 and 10.
        const bases = [1, 2, 3, 4, 5, 10];
        // Avoid 1³ sometimes as it's trivial
        let a = bases[this._getRandomInt(0, bases.length - 1)];
        if (a === 1 && this._getRandomInt(0, 1) === 0) {
            a = bases[this._getRandomInt(1, bases.length - 1)]; // Pick another base if 1 was chosen randomly
        }

        const answer = a * a * a;

        let expression;
        let expression_short = null;

        // Randomly choose between notation and word format
        const formatType = this._getRandomInt(1, 2);
        if (formatType === 1) {
            expression = `${a}³`; // Use the symbol from the base class
            // expression_short is implicitly the same here
        } else {
            expression = `What is ${a} cubed?`;
            expression_short = `${a}³`; // Provide the concise notation as short version
        }

        this.problemDetails = {
            expression: expression,
            // Use expression_short if it was explicitly set, otherwise fallback in getter
            ...(expression_short && { expression_short: expression_short }),
            answer: answer,
            operands: [a] // The base number
        };
    }
}