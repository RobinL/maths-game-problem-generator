import MathProblem from './MathProblem.js';
import Helpers from '../utils/helpers.js';

/**
 * Medium difficulty math problems
 * @extends MathProblem
 */
export default class MediumMath extends MathProblem {
    /**
     * Create a new medium difficulty math problem
     */
    constructor() {
        super('medium');
    }

    /**
     * Generate a medium difficulty math problem
     * Medium problems include:
     * - Two-digit addition and subtraction
     * - Simple multiplication (up to 12)
     * - Simple division with no remainder
     */
    generate() {
        const type = Helpers.getRandomInt(1, 4);

        switch (type) {
            case 1: // Two-digit addition
                const a = Helpers.getRandomInt(10, 50);
                const b = Helpers.getRandomInt(10, 50);
                this.expression = `${a} + ${b}`;
                this.answer = a + b;
                break;

            case 2: // Two-digit subtraction
                const c = Helpers.getRandomInt(30, 99);
                const d = Helpers.getRandomInt(10, 29);
                this.expression = `${c} - ${d}`;
                this.answer = c - d;
                break;

            case 3: // Simple multiplication
                const e = Helpers.getRandomInt(2, 12);
                const f = Helpers.getRandomInt(2, 12);
                this.expression = `${e} × ${f}`;
                this.answer = e * f;
                break;

            case 4: // Simple division (no remainder)
                const divisor = Helpers.getRandomInt(2, 10);
                const result = Helpers.getRandomInt(1, 10);
                const dividend = divisor * result;
                this.expression = `${dividend} / ${divisor}`;
                this.answer = result;
                break;
        }
    }
}