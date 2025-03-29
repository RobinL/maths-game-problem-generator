import BaseCubeProblem from '../base/BaseCubeProblem.js';
import { DIFFICULTY_LEVELS } from '../../difficulty/DifficultyLevel.js';

/**
 * Cube problem for Year 6. Consolidates calculating n³ and introduces finding
 * simple cube roots (³√N) based on recall of small perfect cubes.
 * @extends BaseCubeProblem
 */
export default class Year6CubeProblem extends BaseCubeProblem {
    constructor() {
        super(DIFFICULTY_LEVELS.year6);
        this.generate();
    }

    generate() {
        // Year 6 consolidates cube numbers and inverse relationship (simple cube roots).
        // Choose between generating a cubing problem (n³) or a cube root problem (³√N).
        // Give higher weight to cubing problems.
        const problemType = this._getRandomInt(1, 4); // e.g., 3 chances for cubing, 1 for root

        let a; // Represents the base number
        let answer;
        let expression;
        let expression_short = null;

        if (problemType <= 3) { // Generate a Cubing Problem (n³)
            // Bases commonly recalled or computed mentally in Y6 might extend slightly beyond Y5
            const bases = [2, 3, 4, 5, 6, 7, 8, 9, 10]; // Focus on non-trivial bases
            a = bases[this._getRandomInt(0, bases.length - 1)];
            answer = a * a * a;

            // Randomly choose expression format
            const formatType = this._getRandomInt(1, 2);
            if (formatType === 1) {
                expression = `${a}³`; // Use the symbol
            } else {
                expression = `What is ${a} cubed?`;
                expression_short = `${a}³`;
            }

        } else { // Generate a Cube Root Problem (³√N)
            // Use perfect cubes whose roots are expected recall (2-5, 10)
            const perfectCubes = { 8: 2, 27: 3, 64: 4, 125: 5, 1000: 10 };
            const cubeValues = Object.keys(perfectCubes).map(Number); // Get cube values as numbers
            const N = cubeValues[this._getRandomInt(0, cubeValues.length - 1)];

            a = perfectCubes[N]; // The base number is the answer (cube root)
            answer = a;

            // Use standard cube root notation
            expression = `³√${N}`;
            // Define a concise short version (e.g., for constrained UI)
            expression_short = `cbrt(${N})`;
        }

        this.problemDetails = {
            expression: expression,
            ...(expression_short && { expression_short: expression_short }),
            answer: answer,
            operands: [a] // Store the base number 'a' (which is the root in root problems)
        };
    }
}