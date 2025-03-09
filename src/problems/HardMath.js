import MathProblem from './MathProblem.js';
import Helpers from '../utils/helpers.js';

/**
 * Class for hard math problems (multiplication and 2-digit operations)
 * @extends MathProblem
 */
export default class HardMath extends MathProblem {
    /**
     * Create a new hard math problem
     */
    constructor() {
        super('hard');
    }

    /**
     * Generate a hard math problem (multiplication or 2-digit operations)
     */
    generate() {
        if (Math.random() < 0.6) {
            // Multiplication
            const a = Helpers.getRandomInt(1, 12);
            const b = Helpers.getRandomInt(1, 12);
            this.expression = `${a} × ${b}`;
            this.answer = a * b;
        } else {
            // 2-digit operations
            const isAdd = Math.random() < 0.5;
            if (isAdd) {
                const a = Helpers.getRandomInt(10, 99);
                const b = Helpers.getRandomInt(10, 99);
                this.expression = `${a} + ${b}`;
                this.answer = a + b;
            } else {
                const b = Helpers.getRandomInt(10, 99);
                const a = b + Helpers.getRandomInt(10, 99);
                this.expression = `${a} - ${b}`;
                this.answer = a - b;
            }
        }
    }
}