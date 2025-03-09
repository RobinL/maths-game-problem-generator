import ProblemType from './ProblemType.js';

/**
 * Subtraction problem type
 * @extends ProblemType
 */
export default class SubtractionProblem extends ProblemType {
    /**
     * Create a new subtraction problem type
     */
    constructor() {
        super('subtraction');
        this.symbol = '-';
    }

    /**
     * Generate a subtraction problem based on difficulty parameters
     * @param {Object} params - Parameters defining difficulty
     * @param {number} params.minValue - Minimum value for operands
     * @param {number} params.maxValue - Maximum value for operands
     * @param {boolean} params.ensurePositiveResult - Whether to ensure positive results
     * @param {number} params.restrictToMultiplesOf - Restrict operands to multiples of this number
     * @param {boolean} params.noBorrowing - Whether to ensure no borrowing is needed (for easier mental math)
     * @param {boolean} params.restrictToEasyCalculations - Restrict to subtractions that are easy to calculate mentally
     * @param {boolean} params.includeDecimals - Whether to include decimal subtraction
     * @param {boolean} params.includePercentages - Whether to include percentage calculations
     * @returns {Object} Problem with expression and answer
     */
    generate(params) {
        let a, b;
        let expression, answer;

        // Handle percentage calculations (for Year 6)
        if (params.includePercentages) {
            // Generate problems like "What is 200 minus 15% of 200?"
            const percentages = [10, 15, 20, 25, 50];
            const percentage = percentages[Math.floor(Math.random() * percentages.length)];

            // Generate a number that's easy to calculate the percentage of
            const base = this._getRandomInt(1, 20) * 10; // Multiples of 10 up to 200

            // For Year 6, include specific examples like "130 - 25% of 130"
            if (Math.random() < 0.3) {
                expression = `130 - 25% of 130`;
                answer = 130 - (25 / 100) * 130;
            } else {
                expression = `${base} - ${percentage}% of ${base}`;
                answer = base - ((percentage / 100) * base);
            }

            return {
                expression,
                answer,
                operands: [base, percentage]
            };
        }

        // Handle decimal subtraction (for Year 5 and 6)
        if (params.includeDecimals) {
            // Decide what type of decimal subtraction to generate
            const decimalType = Math.random() < 0.6 ? 'wholeMinusDecimal' : 'decimalMinusDecimal';

            if (decimalType === 'wholeMinusDecimal') {
                // Whole number minus decimal (e.g., 5 - 2.5 = 2.5)
                a = this._getRandomInt(1, 10);

                // Generate a decimal less than a
                const wholePartB = Math.max(0, this._getRandomInt(0, a - 1));
                const decimalPartB = this._getRandomInt(1, 9);
                b = parseFloat(`${wholePartB}.${decimalPartB}`);
            } else {
                // Decimal minus decimal
                const wholePartA = this._getRandomInt(1, 10);
                const decimalPartA = this._getRandomInt(1, 9);
                a = parseFloat(`${wholePartA}.${decimalPartA}`);

                if (params.ensurePositiveResult) {
                    // Ensure b < a for positive result
                    const wholePartB = this._getRandomInt(0, wholePartA);
                    let decimalPartB;

                    if (wholePartB === wholePartA) {
                        // If whole parts are equal, ensure decimal part of b is less than a
                        decimalPartB = this._getRandomInt(1, decimalPartA - 1);
                    } else {
                        decimalPartB = this._getRandomInt(1, 9);
                    }

                    b = parseFloat(`${wholePartB}.${decimalPartB}`);
                } else {
                    // Any decimal
                    const wholePartB = this._getRandomInt(0, 10);
                    const decimalPartB = this._getRandomInt(1, 9);
                    b = parseFloat(`${wholePartB}.${decimalPartB}`);
                }
            }

            return {
                expression: `${a} ${this.symbol} ${b}`,
                answer: parseFloat((a - b).toFixed(2)), // Round to 2 decimal places
                operands: [a, b]
            };
        }

        // For Reception, include specific examples like 4 - 3 = 1
        if (params.maxValue <= 5 && Math.random() < 0.3) {
            a = 4;
            b = 3;
            return {
                expression: `${a} ${this.symbol} ${b}`,
                answer: a - b,
                operands: [a, b]
            };
        }

        // For Year 1, include specific examples like 16 - 7 = 9
        if (params.maxValue === 20 && Math.random() < 0.3) {
            a = 16;
            b = 7;
            return {
                expression: `${a} ${this.symbol} ${b}`,
                answer: a - b,
                operands: [a, b]
            };
        }

        // For Year 2, include specific examples like 24 - 17 = 7
        if (params.maxValue === 50 && params.minValue === 10 && Math.random() < 0.3) {
            a = 24;
            b = 17;
            return {
                expression: `${a} ${this.symbol} ${b}`,
                answer: a - b,
                operands: [a, b]
            };
        }

        // For Year 3, include specific examples like 80 - 50 = 30
        if (params.restrictToMultiplesOf === 10 && Math.random() < 0.3) {
            a = 80;
            b = 50;
            return {
                expression: `${a} ${this.symbol} ${b}`,
                answer: a - b,
                operands: [a, b]
            };
        }

        if (params.restrictToMultiplesOf) {
            // Generate multiples of the specified number
            const minMultiple = Math.ceil(params.minValue / params.restrictToMultiplesOf);
            const maxMultiple = Math.floor(params.maxValue / params.restrictToMultiplesOf);

            if (params.ensurePositiveResult) {
                // Ensure a ≥ b for positive results
                const bMultiple = this._getRandomInt(minMultiple, maxMultiple);
                const aMultiple = this._getRandomInt(bMultiple, maxMultiple);

                a = aMultiple * params.restrictToMultiplesOf;
                b = bMultiple * params.restrictToMultiplesOf;
            } else {
                a = this._getRandomInt(minMultiple, maxMultiple) * params.restrictToMultiplesOf;
                b = this._getRandomInt(minMultiple, maxMultiple) * params.restrictToMultiplesOf;
            }
        } else if (params.noBorrowing) {
            // Generate numbers where digit-by-digit subtraction won't require borrowing
            // This means each digit of a must be greater than or equal to the corresponding digit of b

            // First, generate a within the range
            a = this._getRandomInt(params.minValue, params.maxValue);
            const aDigits = a.toString().split('').map(Number);

            // Then generate b such that each digit is less than or equal to the corresponding digit of a
            let bDigits = [];
            for (let digit of aDigits) {
                bDigits.push(this._getRandomInt(0, digit));
            }

            b = parseInt(bDigits.join(''));

            // Ensure b is within the specified range
            if (b < params.minValue || b > params.maxValue) {
                // If not, fall back to standard generation with ensurePositiveResult
                b = this._getRandomInt(params.minValue, params.maxValue);
                const minA = params.ensurePositiveResult ? b : params.minValue;
                a = this._getRandomInt(minA, params.maxValue);
            }
        } else if (params.restrictToEasyCalculations) {
            // Generate numbers that are easy to subtract mentally
            // Examples: round numbers, numbers close to each other, etc.
            const strategies = [
                // Round numbers (multiples of 10, 100, etc.)
                () => {
                    const magnitude = Math.floor(Math.log10(params.maxValue));
                    const factor = Math.pow(10, Math.max(1, magnitude - 1));

                    if (params.ensurePositiveResult) {
                        const bMultiple = this._getRandomInt(Math.ceil(params.minValue / factor), Math.floor(params.maxValue / factor));
                        const aMultiple = this._getRandomInt(bMultiple, Math.floor(params.maxValue / factor));

                        a = aMultiple * factor;
                        b = bMultiple * factor;
                    } else {
                        a = this._getRandomInt(Math.ceil(params.minValue / factor), Math.floor(params.maxValue / factor)) * factor;
                        b = this._getRandomInt(Math.ceil(params.minValue / factor), Math.floor(params.maxValue / factor)) * factor;
                    }
                },
                // Numbers close to each other (difference < 10)
                () => {
                    a = this._getRandomInt(params.minValue, params.maxValue);
                    // Generate b close to a, but ensure positive result if needed
                    const minDiff = params.ensurePositiveResult ? 0 : -9;
                    const diff = this._getRandomInt(minDiff, 9);
                    b = a - diff;

                    // Ensure b is within range
                    if (b < params.minValue || b > params.maxValue) {
                        b = params.ensurePositiveResult ?
                            this._getRandomInt(params.minValue, a) :
                            this._getRandomInt(params.minValue, params.maxValue);
                    }
                },
                // Complements to 10, 100, etc. (e.g., 100 - 35 = 65)
                () => {
                    const magnitude = Math.floor(Math.log10(params.maxValue));
                    const target = Math.pow(10, magnitude);

                    if (target >= params.minValue && target <= params.maxValue) {
                        a = target;
                        b = this._getRandomInt(params.minValue, Math.min(target - 1, params.maxValue));
                    } else {
                        // Fall back to standard generation
                        a = this._getRandomInt(params.minValue, params.maxValue);
                        b = params.ensurePositiveResult ?
                            this._getRandomInt(params.minValue, a) :
                            this._getRandomInt(params.minValue, params.maxValue);
                    }
                }
            ];

            // Choose a random strategy
            const strategy = strategies[Math.floor(Math.random() * strategies.length)];
            strategy();
        } else if (params.ensurePositiveResult) {
            // Ensure a ≥ b for positive results
            b = this._getRandomInt(params.minValue, params.maxValue);
            a = this._getRandomInt(b, params.maxValue);
        } else {
            // Standard random generation
            a = this._getRandomInt(params.minValue, params.maxValue);
            b = this._getRandomInt(params.minValue, params.maxValue);
        }

        return {
            expression: `${a} ${this.symbol} ${b}`,
            answer: a - b,
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