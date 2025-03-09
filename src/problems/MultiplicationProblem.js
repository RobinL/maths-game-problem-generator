import ProblemType from './ProblemType.js';

/**
 * Multiplication problem type
 * @extends ProblemType
 */
export default class MultiplicationProblem extends ProblemType {
    /**
     * Create a new multiplication problem type
     */
    constructor() {
        super('multiplication');
        this.symbol = '×';
    }

    /**
     * Generate a multiplication problem based on difficulty parameters
     * @param {Object} params - Parameters defining difficulty
     * @param {number} params.minValue - Minimum value for operands
     * @param {number} params.maxValue - Maximum value for operands
     * @param {number[]} params.restrictToTables - Restrict one operand to specific times tables
     * @param {number[]} params.restrictToMultiplesOf - Restrict one operand to multiples of specific numbers
     * @param {boolean} params.isDoubling - Whether to generate doubling problems instead of multiplication
     * @param {boolean} params.isCountingInSteps - Whether to generate counting in steps problems
     * @param {boolean} params.singleDigitOnly - Whether to restrict to single-digit by single-digit
     * @param {boolean} params.includeDoubleDigit - Whether to include double-digit multiplication
     * @param {boolean} params.includeTwoDigitByOneDigit - Whether to include two-digit by one-digit
     * @param {boolean} params.includeTwoDigitByTwoDigit - Whether to include two-digit by two-digit
     * @param {boolean} params.includeThreeDigitByOneDigit - Whether to include three-digit by one-digit
     * @param {boolean} params.includeDecimals - Whether to include decimal multiplication
     * @param {boolean} params.avoidTrivial - Whether to avoid trivial problems like 1×1
     * @param {number} params.maxCharacters - Maximum number of characters for the expression
     * @returns {Object} Problem with expression and answer
     */
    generate(params) {
        let a, b;
        let expression, answer;

        // Adjust minValue if avoidTrivial is set to avoid 1×1 problems
        const effectiveMinValue = params.avoidTrivial ? Math.max(params.minValue, 2) : params.minValue;

        // Handle doubling problems (for Reception and Year 1)
        if (params.isDoubling) {
            // For Reception, focus on doubling numbers 2-5
            // For Year 1, focus on doubling numbers 2-10
            a = this._getRandomInt(effectiveMinValue, params.maxValue);
            expression = `dbl ${a}`;

            // Check if the expression fits within maxCharacters
            if (params.maxCharacters && expression.length > params.maxCharacters) {
                expression = `2×${a}`;
            }

            answer = a * 2;
            return {
                expression,
                answer,
                operands: [a]
            };
        }

        // Handle counting in steps problems (for Year 1)
        if (params.isCountingInSteps) {
            // Choose a step size from restrictToTables or default to 2, 5, 10
            const stepSizes = params.restrictToTables || [2, 5, 10];
            const stepSize = stepSizes[Math.floor(Math.random() * stepSizes.length)];

            // Generate a starting point (multiple of the step size)
            const start = this._getRandomInt(0, 3) * stepSize;

            // Generate the next number in the sequence
            expression = `Count in ${stepSize}s: ${start}, ${start + stepSize}, ?`;
            answer = start + (2 * stepSize);

            return {
                expression,
                answer,
                operands: [start, stepSize]
            };
        }

        // Handle decimal multiplication (for Year 5 and 6)
        if (params.includeDecimals) {
            // Decide if we're doing a whole number × decimal or decimal × decimal
            const decimalType = Math.random() < 0.7 ? 'wholeByDecimal' : 'decimalByDecimal';

            if (decimalType === 'wholeByDecimal') {
                // Whole number × decimal
                a = this._getRandomInt(2, 12); // Whole number

                // Generate a decimal with 1 decimal place
                const wholePartB = this._getRandomInt(0, 9);
                const decimalPartB = this._getRandomInt(1, 9);
                b = parseFloat(`${wholePartB}.${decimalPartB}`);

                // For Year 5, include specific examples like 0.75 × 4
                if (Math.random() < 0.3) {
                    b = 0.75;
                    a = this._getRandomInt(2, 8);
                }
            } else {
                // Decimal × decimal (simpler cases)
                const wholePartA = this._getRandomInt(0, 5);
                const decimalPartA = this._getRandomInt(1, 9);
                a = parseFloat(`${wholePartA}.${decimalPartA}`);

                const wholePartB = this._getRandomInt(0, 5);
                const decimalPartB = this._getRandomInt(1, 9);
                b = parseFloat(`${wholePartB}.${decimalPartB}`);
            }

            return {
                expression: `${a} ${this.symbol} ${b}`,
                answer: parseFloat((a * b).toFixed(2)), // Round to 2 decimal places
                operands: [a, b]
            };
        }

        // Handle two-digit by two-digit multiplication (for Year 6)
        if (params.includeTwoDigitByTwoDigit) {
            a = this._getRandomInt(10, 99);
            b = this._getRandomInt(10, 99);

            // For mental calculation, prefer at least one "friendly" number
            if (Math.random() < 0.7) {
                // Make one operand a multiple of 10 or a number ending in 5
                if (Math.random() < 0.5) {
                    a = Math.floor(a / 10) * 10; // Multiple of 10
                } else {
                    a = Math.floor(a / 10) * 10 + 5; // Number ending in 5
                }
            }

            return {
                expression: `${a} ${this.symbol} ${b}`,
                answer: a * b,
                operands: [a, b]
            };
        }

        // Handle two-digit by one-digit multiplication (for Year 5)
        if (params.includeTwoDigitByOneDigit) {
            a = this._getRandomInt(10, 99);
            b = this._getRandomInt(effectiveMinValue, 9);

            // Randomly swap a and b to vary the presentation
            if (Math.random() > 0.5) {
                [a, b] = [b, a];
            }

            return {
                expression: `${a} ${this.symbol} ${b}`,
                answer: a * b,
                operands: [a, b]
            };
        }

        // Handle double-digit multiplication (for Year 4)
        if (params.includeDoubleDigit) {
            // For Year 4, focus on multiplication facts up to 12×12
            a = this._getRandomInt(effectiveMinValue, 12);
            b = this._getRandomInt(effectiveMinValue, 12);

            return {
                expression: `${a} ${this.symbol} ${b}`,
                answer: a * b,
                operands: [a, b]
            };
        }

        // Handle single-digit by single-digit multiplication (for Year 2 and 3)
        if (params.singleDigitOnly) {
            if (params.restrictToTables && params.restrictToTables.length > 0) {
                // Use one operand from the specified times tables
                const tableIndex = Math.floor(Math.random() * params.restrictToTables.length);
                a = params.restrictToTables[tableIndex];
                b = this._getRandomInt(effectiveMinValue, 10);

                // Randomly swap a and b to vary the presentation
                if (Math.random() > 0.5) {
                    [a, b] = [b, a];
                }
            } else {
                // Standard single-digit multiplication
                a = this._getRandomInt(effectiveMinValue, 9);
                b = this._getRandomInt(effectiveMinValue, 9);
            }

            return {
                expression: `${a} ${this.symbol} ${b}`,
                answer: a * b,
                operands: [a, b]
            };
        }

        // Handle multiplication with multiples (for Year 5)
        if (params.restrictToMultiplesOf && params.restrictToMultiplesOf.length > 0) {
            // Use one operand that is a multiple of the specified numbers
            const multipleIndex = Math.floor(Math.random() * params.restrictToMultiplesOf.length);
            const multipleOf = params.restrictToMultiplesOf[multipleIndex];

            // Generate a multiple within the range
            const minMultiple = Math.ceil(params.minValue / multipleOf);
            const maxMultiple = Math.floor(params.maxValue / multipleOf);
            a = this._getRandomInt(minMultiple, maxMultiple) * multipleOf;

            // Generate the other operand normally
            b = this._getRandomInt(effectiveMinValue, params.maxValue);

            // Randomly swap a and b to vary the presentation
            if (Math.random() > 0.5) {
                [a, b] = [b, a];
            }

            return {
                expression: `${a} ${this.symbol} ${b}`,
                answer: a * b,
                operands: [a, b]
            };
        }

        // Handle three-digit by one-digit multiplication (for Year 9)
        if (params.includeThreeDigitByOneDigit && Math.random() < 0.3) {
            a = this._getRandomInt(100, Math.min(params.maxValue, 999));
            b = this._getRandomInt(effectiveMinValue, 9);

            expression = `${a} ${this.symbol} ${b}`;

            // Check if the expression fits within maxCharacters
            if (params.maxCharacters && expression.length > params.maxCharacters) {
                // Try with a smaller three-digit number
                a = this._getRandomInt(100, 299);
                expression = `${a}${this.symbol}${b}`;
            }

            answer = a * b;
            return {
                expression,
                answer,
                operands: [a, b]
            };
        }

        // Standard random generation for other cases
        if (params.restrictToTables && params.restrictToTables.length > 0) {
            // Use one operand from the specified times tables
            const tableIndex = Math.floor(Math.random() * params.restrictToTables.length);
            a = params.restrictToTables[tableIndex];
            b = this._getRandomInt(effectiveMinValue, params.maxValue);

            // Randomly swap a and b to vary the presentation
            if (Math.random() > 0.5) {
                [a, b] = [b, a];
            }
        } else {
            // Standard random generation
            a = this._getRandomInt(effectiveMinValue, params.maxValue);
            b = this._getRandomInt(effectiveMinValue, params.maxValue);
        }

        // After generating the expression, check if it fits within maxCharacters
        expression = `${a} ${this.symbol} ${b}`;
        if (params.maxCharacters && expression.length > params.maxCharacters) {
            // Try to simplify the expression by removing spaces
            expression = `${a}${this.symbol}${b}`;

            // If still too long, try to regenerate with smaller numbers
            if (expression.length > params.maxCharacters) {
                const adjustedParams = { ...params };
                adjustedParams.maxValue = Math.min(params.maxValue, 99);

                // Recursively try again with adjusted parameters
                return this.generate(adjustedParams);
            }
        }

        answer = a * b;
        return {
            expression,
            answer,
            operands: [a, b]
        };
    }

    /**
     * Generate a random integer between min and max (inclusive)
     * @param {number} min - Minimum value
     * @param {number} max - Maximum value
     * @returns {number} Random integer
     * @private
     */
    _getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}