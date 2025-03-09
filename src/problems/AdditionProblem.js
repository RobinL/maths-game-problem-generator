import ProblemType from './ProblemType.js';

/**
 * Addition problem type
 * @extends ProblemType
 */
export default class AdditionProblem extends ProblemType {
    /**
     * Create a new addition problem type
     */
    constructor() {
        super('addition');
        this.symbol = '+';
    }

    /**
     * Generate an addition problem based on difficulty parameters
     * @param {Object} params - Parameters defining difficulty
     * @param {number} params.minValue - Minimum value for operands
     * @param {number} params.maxValue - Maximum value for operands
     * @param {number} params.maxSum - Maximum value for the sum
     * @param {number} params.restrictToMultiplesOf - Restrict operands to multiples of this number
     * @param {boolean} params.noCarrying - Whether to ensure no carrying is needed (for easier mental math)
     * @param {boolean} params.restrictToEasyCalculations - Restrict to additions that are easy to calculate mentally
     * @param {boolean} params.includeDecimals - Whether to include decimal addition
     * @param {boolean} params.includePercentages - Whether to include percentage calculations
     * @returns {Object} Problem with expression and answer
     */
    generate(params) {
        let a, b;
        let expression, answer;

        // Handle percentage calculations (for Year 6)
        if (params.includePercentages) {
            // Generate percentage problems like "10% of 200"
            const percentages = [10, 15, 20, 25, 50, 75];
            const percentage = percentages[Math.floor(Math.random() * percentages.length)];

            // Generate a number that's easy to calculate the percentage of
            const base = this._getRandomInt(1, 20) * 10; // Multiples of 10 up to 200

            expression = `${percentage}% of ${base}`;
            answer = (percentage / 100) * base;

            return {
                expression,
                answer,
                operands: [percentage, base]
            };
        }

        // Handle decimal addition (for Year 5 and 6)
        if (params.includeDecimals) {
            // Decide what type of decimal addition to generate
            const decimalType = Math.random() < 0.6 ? 'complements' : 'general';

            if (decimalType === 'complements') {
                // Generate complements to 1, 10, etc. with decimals
                const target = Math.random() < 0.7 ? 1 : 10;

                if (target === 1) {
                    // Complements to 1 (e.g., 0.7 + 0.3 = 1)
                    const decimalPlaces = 1;
                    const divisor = Math.pow(10, decimalPlaces);

                    a = this._getRandomInt(1, divisor - 1) / divisor;
                    b = target - a;
                } else {
                    // Complements to 10 (e.g., 7.5 + 2.5 = 10)
                    const wholePartA = this._getRandomInt(0, target - 1);
                    const decimalPartA = this._getRandomInt(1, 9);
                    a = parseFloat(`${wholePartA}.${decimalPartA}`);

                    b = target - a;
                    // Round to 1 decimal place to avoid floating point issues
                    b = parseFloat(b.toFixed(1));
                }
            } else {
                // General decimal addition
                const wholePartA = this._getRandomInt(1, 9);
                const decimalPartA = this._getRandomInt(1, 9);
                a = parseFloat(`${wholePartA}.${decimalPartA}`);

                const wholePartB = this._getRandomInt(1, 9);
                const decimalPartB = this._getRandomInt(1, 9);
                b = parseFloat(`${wholePartB}.${decimalPartB}`);
            }

            return {
                expression: `${a} ${this.symbol} ${b}`,
                answer: parseFloat((a + b).toFixed(2)), // Round to 2 decimal places
                operands: [a, b]
            };
        }

        // Handle addition with max sum constraint
        if (params.maxSum) {
            let attempts = 0;
            const maxAttempts = 10;

            // For Reception, ensure sums don't exceed 10
            // For Year 1, ensure sums don't exceed 20
            const maxSumValue = params.maxSum;

            do {
                if (params.restrictToMultiplesOf) {
                    // Generate multiples of the specified number
                    const minMultiple = Math.ceil(params.minValue / params.restrictToMultiplesOf);
                    const maxMultiple = Math.floor(params.maxValue / params.restrictToMultiplesOf);

                    a = this._getRandomInt(minMultiple, maxMultiple) * params.restrictToMultiplesOf;

                    // Ensure the second operand doesn't make the sum exceed maxSum
                    const maxBMultiple = Math.floor((maxSumValue - a) / params.restrictToMultiplesOf);
                    if (maxBMultiple >= minMultiple) {
                        b = this._getRandomInt(minMultiple, maxBMultiple) * params.restrictToMultiplesOf;
                    } else {
                        // If constraints can't be met, generate a smaller first operand
                        a = this._getRandomInt(minMultiple, Math.floor(maxSumValue / 2 / params.restrictToMultiplesOf)) * params.restrictToMultiplesOf;
                        b = this._getRandomInt(minMultiple, Math.floor((maxSumValue - a) / params.restrictToMultiplesOf)) * params.restrictToMultiplesOf;
                    }
                } else if (params.noCarrying) {
                    // Generate numbers where digit-by-digit addition won't require carrying
                    a = this._getRandomInt(params.minValue, Math.min(params.maxValue, maxSumValue - params.minValue));

                    // Ensure no carrying by constraining each digit of b
                    const aDigits = a.toString().split('').map(Number);
                    let bDigits = [];

                    for (let digit of aDigits) {
                        // Each digit of b must be such that when added to the corresponding digit of a,
                        // the sum is less than 10 (to avoid carrying)
                        bDigits.push(this._getRandomInt(0, 9 - digit));
                    }

                    b = parseInt(bDigits.join(''));

                    // Ensure b is within the specified range and the sum doesn't exceed maxSum
                    if (b < params.minValue || b > params.maxValue || a + b > maxSumValue) {
                        // If not, fall back to standard generation
                        b = this._getRandomInt(params.minValue, Math.min(params.maxValue, maxSumValue - a));
                    }
                } else if (params.restrictToEasyCalculations) {
                    // Generate numbers that are easy to add mentally
                    // Examples: round numbers, numbers that sum to 10/100/1000, etc.
                    const strategies = [
                        // Numbers that sum to 10, 100, 1000, etc.
                        () => {
                            // For Reception and Year 1, focus on number bonds to 10
                            if (maxSumValue <= 20) {
                                const target = 10;
                                if (target <= maxSumValue) {
                                    a = this._getRandomInt(params.minValue, Math.min(target - params.minValue, params.maxValue));
                                    b = target - a;
                                } else {
                                    // Fall back to standard generation
                                    a = this._getRandomInt(params.minValue, Math.min(params.maxValue, maxSumValue - params.minValue));
                                    b = this._getRandomInt(params.minValue, Math.min(params.maxValue, maxSumValue - a));
                                }
                            } else {
                                const target = Math.min(maxSumValue, Math.pow(10, Math.floor(Math.log10(params.maxValue))));
                                a = this._getRandomInt(params.minValue, Math.min(target - params.minValue, params.maxValue));
                                b = target - a;
                            }
                        },
                        // Round numbers (multiples of 10, 100, etc.)
                        () => {
                            const magnitude = Math.floor(Math.log10(params.maxValue));
                            const factor = Math.pow(10, Math.max(1, magnitude - 1));

                            // Ensure the first operand doesn't exceed half of maxSum
                            const maxAMultiple = Math.floor(Math.min(maxSumValue / 2, params.maxValue) / factor);
                            a = this._getRandomInt(Math.ceil(params.minValue / factor), maxAMultiple) * factor;

                            // Ensure the sum doesn't exceed maxSum
                            const maxB = maxSumValue - a;
                            const maxBMultiple = Math.floor(Math.min(maxB, params.maxValue) / factor);

                            if (maxBMultiple >= Math.ceil(params.minValue / factor)) {
                                b = this._getRandomInt(Math.ceil(params.minValue / factor), maxBMultiple) * factor;
                            } else {
                                // Fall back to standard generation if constraints can't be met
                                b = this._getRandomInt(params.minValue, Math.min(params.maxValue, maxSumValue - a));
                            }
                        }
                    ];

                    // Choose a random strategy
                    const strategy = strategies[Math.floor(Math.random() * strategies.length)];
                    strategy();
                } else {
                    // Standard random generation with maxSum constraint
                    a = this._getRandomInt(params.minValue, Math.min(params.maxValue, maxSumValue - params.minValue));
                    b = this._getRandomInt(params.minValue, Math.min(params.maxValue, maxSumValue - a));
                }

                attempts++;
            } while (a + b > maxSumValue && attempts < maxAttempts);

            // If we couldn't generate a valid problem after maxAttempts, adjust b to ensure maxSum is respected
            if (a + b > maxSumValue) {
                b = maxSumValue - a;
            }

            // For Reception, include specific examples like 2 + 3 = 5
            if (maxSumValue === 10 && Math.random() < 0.3) {
                a = 2;
                b = 3;
            }

            // For Year 1, include specific examples like 9 + 5 = 14
            if (maxSumValue === 20 && Math.random() < 0.3) {
                a = 9;
                b = 5;
            }

            return {
                expression: `${a} ${this.symbol} ${b}`,
                answer: a + b,
                operands: [a, b]
            };
        }

        // Handle standard addition problems
        if (params.restrictToMultiplesOf) {
            // Generate multiples of the specified number
            const minMultiple = Math.ceil(params.minValue / params.restrictToMultiplesOf);
            const maxMultiple = Math.floor(params.maxValue / params.restrictToMultiplesOf);

            a = this._getRandomInt(minMultiple, maxMultiple) * params.restrictToMultiplesOf;
            b = this._getRandomInt(minMultiple, maxMultiple) * params.restrictToMultiplesOf;
        } else if (params.noCarrying) {
            // Generate numbers where digit-by-digit addition won't require carrying
            a = this._getRandomInt(params.minValue, params.maxValue);

            // Ensure no carrying by constraining each digit of b
            const aDigits = a.toString().split('').map(Number);
            let bDigits = [];

            for (let digit of aDigits) {
                // Each digit of b must be such that when added to the corresponding digit of a,
                // the sum is less than 10 (to avoid carrying)
                bDigits.push(this._getRandomInt(0, 9 - digit));
            }

            b = parseInt(bDigits.join(''));

            // Ensure b is within the specified range
            if (b < params.minValue || b > params.maxValue) {
                // If not, fall back to standard generation
                b = this._getRandomInt(params.minValue, params.maxValue);
            }
        } else if (params.restrictToEasyCalculations) {
            // Generate numbers that are easy to add mentally
            // Examples: round numbers, numbers that sum to 10/100/1000, etc.
            const strategies = [
                // Numbers that sum to 10, 100, 1000, etc.
                () => {
                    const target = Math.pow(10, Math.floor(Math.log10(params.maxValue)));
                    a = this._getRandomInt(params.minValue, Math.min(target - params.minValue, params.maxValue));
                    b = target - a;
                },
                // Round numbers (multiples of 10, 100, etc.)
                () => {
                    const magnitude = Math.floor(Math.log10(params.maxValue));
                    const factor = Math.pow(10, Math.max(1, magnitude - 1));
                    a = this._getRandomInt(Math.ceil(params.minValue / factor), Math.floor(params.maxValue / factor)) * factor;
                    b = this._getRandomInt(Math.ceil(params.minValue / factor), Math.floor(params.maxValue / factor)) * factor;
                }
            ];

            // Choose a random strategy
            const strategy = strategies[Math.floor(Math.random() * strategies.length)];
            strategy();
        } else {
            // Standard random generation
            a = this._getRandomInt(params.minValue, params.maxValue);
            b = this._getRandomInt(params.minValue, params.maxValue);
        }

        return {
            expression: `${a} ${this.symbol} ${b}`,
            answer: a + b,
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