import BaseAdditionProblem from '../base/BaseAdditionProblem.js';
import { DIFFICULTY_LEVELS } from '../../difficulty/DifficultyLevel.js';

/**
 * Addition problem for Year 2
 * @extends BaseAdditionProblem
 */
export default class Year2AdditionProblem extends BaseAdditionProblem {

    constructor() {
        super(DIFFICULTY_LEVELS.year2);
        this.generate()
    }

    generate() {
        // By the end of Year 2, children should know all addition facts up to 20 fluently
        // They use those facts to derive related sums up to 100
        // Mentally, they can add a two-digit number and a one-digit or tens number

        // Randomly choose between different types of Year 2 addition problems
        const problemType = this._getRandomInt(1, 4);

        let a, b;

        switch (problemType) {
            case 1: // Addition facts within 20 (including bridging through 10)
                a = this._getRandomInt(8, 14);
                b = this._getRandomInt(3, 20 - a);
                // Avoid trivial problems like adding 0
                if (b === 0) b = 1;
                break;

            case 2: // Adding a one-digit number to a two-digit number
                a = this._getRandomInt(20, 90);
                b = this._getRandomInt(1, 9);
                break;

            case 3: // Adding tens to a two-digit number
                a = this._getRandomInt(10, 70);
                b = this._getRandomInt(1, 3) * 10; // 10, 20, or 30
                break;

            case 4: // Derived facts using place value (e.g., if 3+7=10, then 30+70=100)
                const baseA = this._getRandomInt(1, 9);
                const baseB = this._getRandomInt(1, 10 - baseA); // Ensure sum ≤ 10
                a = baseA * 10;
                b = baseB * 10;
                break;
        }

        this.problemDetails = {
            expression: `${a} + ${b}`,
            answer: a + b,
            operands: [a, b]
        };
    }
}