import BaseAdditionProblem from '../base/BaseAdditionProblem.js';
import { DIFFICULTY_LEVELS } from '../../difficulty/DifficultyLevel.js';

/**
 * Addition problem for Year 1
 * @extends BaseAdditionProblem
 */
export default class Year1AdditionProblem extends BaseAdditionProblem {

    constructor() {
        super(DIFFICULTY_LEVELS.year1);
    }

    generate() {
        // In Year 1, children should mentally add small numbers with sums up to 20
        // They rely on number bonds and counting on

        // Randomly choose between different types of Year 1 addition problems
        const problemType = this._getRandomInt(1, 3);

        let a, b;

        switch (problemType) {
            case 1: // Simple addition of two single-digit numbers (sum ≤ 20)
                a = this._getRandomInt(1, 9);
                b = this._getRandomInt(1, Math.min(9, 20 - a));
                break;

            case 2: // Number bonds to 10
                a = this._getRandomInt(1, 9);
                b = 10 - a;
                break;

            case 3: // Adding a single digit to a teen number (sum ≤ 20)
                a = this._getRandomInt(10, 14);
                b = this._getRandomInt(1, 20 - a);
                break;
        }

        this.problemDetails = {
            expression: `${a} + ${b}`,
            answer: a + b,
            operands: [a, b]
        };
    }
}