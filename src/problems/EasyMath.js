import MathProblem from './MathProblem.js';
import Helpers from '../utils/helpers.js';

/**
 * Class for easy math problems (addition and subtraction)
 * @extends MathProblem
 */
export default class EasyMath extends MathProblem {
    /**
     * Create a new easy math problem
     */
    constructor() {
        super('easy');
    }

    /**
     * Generate an easy math problem (addition or subtraction)
     */
    generate() {
        if (Math.random() < 0.5) {
            // Addition
            const a = Helpers.getRandomInt(1, 10);
            const b = Helpers.getRandomInt(1, 10);
            this.expression = `${a} + ${b}`;
            this.answer = a + b;
        } else {
            // Subtraction (positive result)
            const b = Helpers.getRandomInt(1, 10);
            const a = b + Helpers.getRandomInt(0, 10);
            this.expression = `${a} - ${b}`;
            this.answer = a - b;
        }
    }
}