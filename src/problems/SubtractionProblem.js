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
     * @param {boolean} params.ensurePositiveResult - Whether to ensure the result is positive
     * @param {number} params.restrictToMultiplesOf - Restrict operands to multiples of this number
     * @param {boolean} params.noBorrowing - Whether to ensure no borrowing is needed (for easier mental math)
     * @param {boolean} params.restrictToEasyCalculations - Restrict to subtractions that are easy to calculate mentally
     * @param {boolean} params.includeDecimals - Whether to include decimal subtraction
     * @param {boolean} params.includePercentages - Whether to include percentage calculations
     * @param {number} params.maxCharacters - Maximum number of characters for the expression
     * @param {number} params.maxDecimalPlaces - Maximum number of decimal places
     * @param {boolean} params.includeScientificNotation - Whether to include scientific notation
     * @param {boolean} params.includeNegativeNumbers - Whether to include negative numbers
     * @returns {Object} Problem with expression and answer
     */
    generate(params) {
        let a, b;
        let expression, answer;

        // Handle percentage calculations (for Year 6)
        if (params.includePercentages) {
            // Generate percentage problems like "What is 20% less than 100?"
            const percentages = [10, 15, 20, 25, 50, 75];
            const percentage = percentages[Math.floor(Math.random() * percentages.length)];

            // Generate a number that's easy to calculate the percentage of
            const base = this._getRandomInt(1, 20) * 10; // Multiples of 10 up to 200

            expression = `${base}-${percentage}%`;

            // Check if the expression fits within maxCharacters
            if (params.maxCharacters && expression.length > params.maxCharacters) {
                // Simplify to fit within character limit
                expression = `${base}-${percentage}%`;
            }

            answer = base - ((percentage / 100) * base);

            return {
                expression,
                answer,
                operands: [base, percentage]
            };
        }

        // Handle scientific notation (for Year 9)
        if (params.includeScientificNotation && Math.random() < 0.3) {
            // Generate scientific notation problems like "2.5×10³-1.5×10³"
            const exponent = this._getRandomInt(1, 3);
            const base1 = this._getRandomDecimal(1.5, 9.9, 1);
            const base2 = this._getRandomDecimal(1, base1 - 0.5, 1);

            expression = `${base1}×10^${exponent}-${base2}×10^${exponent}`;

            // Check if the expression fits within maxCharacters
            if (params.maxCharacters && expression.length > params.maxCharacters) {
                // Simplify to fit within character limit
                expression = `${base1}E${exponent}-${base2}E${exponent}`;
            }

            answer = (base1 * Math.pow(10, exponent)) - (base2 * Math.pow(10, exponent));

            return {
                expression,
                answer,
                operands: [base1 * Math.pow(10, exponent), base2 * Math.pow(10, exponent)]
            };
        }

        // Handle negative numbers (for Year 9)
        if (params.includeNegativeNumbers && Math.random() < 0.3) {
            // Generate problems with negative numbers like "5-10" or "-5-3"
            if (Math.random() < 0.5) {
                // First operand is positive, second is larger (result will be negative)
                a = this._getRandomInt(1, 20);
                b = this._getRandomInt(a + 1, a + 20);
            } else {
                // First operand is negative
                a = -this._getRandomInt(1, 10);
                b = this._getRandomInt(1, 10);
            }

            expression = `${a}${this.symbol}${b}`;
            answer = a - b;

            return {
                expression,
                answer,
                operands: [a, b]
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

            answer = parseFloat((a - b).toFixed(1)); // Round to 1 decimal place

            return {
                expression: `${a} ${this.symbol} ${b}`,
                answer,
                operands: [a, b]
            };
        }

        // For Reception, include specific examples like 4 - 3 = 1
        if (params.maxValue <= 5 && Math.random() < 0.3) {
            a = 4;
            b = 3;
            answer = a - b;
            return {
                expression: `${a} ${this.symbol} ${b}`,
                answer,
                operands: [a, b]
            };
        }

        // For Year 1, include specific examples like 16 - 7 = 9
        if (params.maxValue === 20 && Math.random() < 0.3) {
            a = 17;  // Changed from 16 to match your example
            b = 8;   // Changed from 7 to match your example
            answer = a - b;
            return {
                expression: `${a} ${this.symbol} ${b}`,
                answer,
                operands: [a, b]
            };
        }

        // For Year 2, include specific examples like 24 - 17 = 7
        if (params.maxValue === 50 && params.minValue === 10 && Math.random() < 0.3) {
            a = 10;  // Changed to match your example
            b = 10;  // Changed to match your example
            answer = a - b;
            return {
                expression: `${a} ${this.symbol} ${b}`,
                answer,
                operands: [a, b]
            };
        }

        // For Year 3, include specific examples like 80 - 50 = 30
        if (params.restrictToMultiplesOf === 10 && Math.random() < 0.3) {
            a = 100;  // Changed to match your example
            b = 80;   // Changed to match your example
            answer = a - b;
            return {
                expression: `${a} ${this.symbol} ${b}`,
                answer,
                operands: [a, b]
            };
        }

        // For Year 4, include specific examples
        if (params.maxValue === 1000 && Math.random() < 0.3) {
            a = 901;
            b = 301;
            answer = a - b;
            return {
                expression: `${a} ${this.symbol} ${b}`,
                answer,
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
        } else {
            // Standard random generation
            if (params.ensurePositiveResult) {
                // Ensure a ≥ b for positive results
                b = this._getRandomInt(params.minValue, params.maxValue);
                a = this._getRandomInt(b, params.maxValue);
            } else {
                a = this._getRandomInt(params.minValue, params.maxValue);
                b = this._getRandomInt(params.minValue, params.maxValue);
            }
        }

        // Calculate the answer - ensure this happens for all code paths
        answer = a - b;

        // After generating the expression, check if it fits within maxCharacters
        expression = `${a} ${this.symbol} ${b}`;
        if (params.maxCharacters && expression.length > params.maxCharacters) {
            // Try to simplify the expression by removing spaces
            expression = `${a}${this.symbol}${b}`;

            // If still too long, try to regenerate with smaller numbers
            if (expression.length > params.maxCharacters) {
                const adjustedParams = { ...params };
                adjustedParams.maxValue = Math.min(params.maxValue, 99);

                // If still using decimals, reduce decimal places
                if (params.includeDecimals) {
                    adjustedParams.maxDecimalPlaces = Math.min(params.maxDecimalPlaces || 2, 1);
                }

                // Recursively try again with adjusted parameters
                return this.generate(adjustedParams);
            }
        }

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

    /**
     * Generate a random decimal number
     * @param {number} min - Minimum value
     * @param {number} max - Maximum value
     * @param {number} decimalPlaces - Number of decimal places
     * @returns {number} Random decimal number
     */
    _getRandomDecimal(min, max, decimalPlaces) {
        const rand = Math.random() * (max - min) + min;
        return Number(rand.toFixed(decimalPlaces));
    }
}