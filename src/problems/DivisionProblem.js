import ProblemType from './ProblemType.js';

/**
 * Division problem type
 * @extends ProblemType
 */
export default class DivisionProblem extends ProblemType {
    /**
     * Create a new division problem type
     */
    constructor() {
        super('division');
        this.symbol = '/';
    }

    /**
     * Generate a division problem based on difficulty parameters
     * @param {Object} params - Parameters defining difficulty
     * @param {number} params.minDivisor - Minimum value for divisor
     * @param {number} params.maxDivisor - Maximum value for divisor
     * @param {number} params.minResult - Minimum value for result
     * @param {number} params.maxResult - Maximum value for result
     * @param {boolean} params.allowRemainder - Whether to allow division with remainders
     * @param {number[]} params.restrictToDivisors - Restrict divisors to specific values
     * @param {boolean} params.restrictToEasyCalculations - Restrict to divisions that are easy to calculate mentally
     * @param {boolean} params.isHalving - Whether to generate halving problems instead of division
     * @param {boolean} params.singleDigitDivisorOnly - Whether to restrict to single-digit divisors
     * @param {boolean} params.includeLargerDividends - Whether to include larger dividends
     * @param {boolean} params.includeDecimals - Whether to include decimal division
     * @param {boolean} params.avoidTrivial - Whether to avoid trivial problems like 2÷2
     * @param {boolean} params.ensureAccurateDecimals - Whether to ensure decimal results are accurate
     * @param {number} params.maxDividend - Maximum value for dividend
     * @returns {Object} Problem with expression and answer
     */
    generate(params) {
        let divisor, dividend, result;
        let expression, answer;

        // Handle halving problems (for Reception and Year 1)
        if (params.isHalving) {
            // Generate an even number to halve within the specified range
            // For Reception, focus on halving numbers up to 10
            // For Year 1, focus on halving numbers up to 10
            const maxDividend = params.maxDividend || 10;

            // Generate an even number within the range
            const evenNumbers = [];
            for (let i = 2; i <= maxDividend; i += 2) {
                evenNumbers.push(i);
            }

            if (evenNumbers.length === 0) {
                // Fallback if no even numbers in range
                dividend = 4;
            } else {
                dividend = evenNumbers[Math.floor(Math.random() * evenNumbers.length)];
            }

            expression = `Half of ${dividend}`;
            answer = dividend / 2;

            return {
                expression,
                answer,
                operands: [dividend]
            };
        }

        // Handle decimal division (for Year 6)
        if (params.includeDecimals) {
            if (params.ensureAccurateDecimals) {
                // For Year 6, ensure accurate decimal results
                // Generate problems with clean decimal answers
                const cleanDivisors = [2, 4, 5, 8, 10, 20, 25, 50, 100];
                const availableDivisors = params.restrictToDivisors || cleanDivisors;

                // Filter divisors within the specified range
                const validDivisors = availableDivisors.filter(d =>
                    d >= params.minDivisor && d <= params.maxDivisor);

                if (validDivisors.length === 0) {
                    // Fallback if no valid divisors
                    divisor = params.minDivisor;
                } else {
                    divisor = validDivisors[Math.floor(Math.random() * validDivisors.length)];
                }

                // Generate a dividend that will result in a clean decimal
                const wholePartResult = this._getRandomInt(params.minResult, params.maxResult);
                dividend = wholePartResult * divisor;

                return {
                    expression: `${dividend} ${this.symbol} ${divisor}`,
                    answer: wholePartResult,
                    operands: [dividend, divisor]
                };
            } else {
                // Decide if we're doing a decimal ÷ whole number or whole number ÷ whole number with decimal result
                const decimalType = Math.random() < 0.7 ? 'wholeByWhole' : 'decimalByWhole';

                if (decimalType === 'wholeByWhole') {
                    // Whole number ÷ whole number with decimal result
                    divisor = this._getRandomInt(params.minDivisor, params.maxDivisor);

                    // Generate a dividend that will result in a clean decimal
                    const decimalPlaces = Math.random() < 0.7 ? 1 : 2; // 1 or 2 decimal places

                    if (decimalPlaces === 1) {
                        // For 1 decimal place, use multiples of 0.1
                        result = this._getRandomInt(1, 9) / 10 + this._getRandomInt(1, 9);
                        dividend = Math.round(result * divisor);
                    } else {
                        // For 2 decimal places, use multiples of 0.01
                        result = this._getRandomInt(1, 99) / 100 + this._getRandomInt(1, 9);
                        dividend = Math.round(result * divisor);
                    }
                } else {
                    // Decimal ÷ whole number
                    divisor = this._getRandomInt(params.minDivisor, params.maxDivisor);

                    // Generate a decimal dividend
                    const wholePart = this._getRandomInt(1, 20);
                    const decimalPart = this._getRandomInt(1, 9);
                    dividend = parseFloat(`${wholePart}.${decimalPart}`);

                    result = dividend / divisor;
                }

                return {
                    expression: `${dividend} ${this.symbol} ${divisor}`,
                    answer: parseFloat(result.toFixed(2)), // Round to 2 decimal places
                    operands: [dividend, divisor]
                };
            }
        }

        // Adjust minDivisor and minResult if avoidTrivial is set to avoid 2÷2 problems
        const effectiveMinDivisor = params.avoidTrivial ? Math.max(params.minDivisor, 3) : params.minDivisor;
        const effectiveMinResult = params.avoidTrivial ? Math.max(params.minResult, 2) : params.minResult;

        // Handle larger dividends (for Year 4, 5, and 6)
        if (params.includeLargerDividends) {
            if (params.restrictToDivisors && params.restrictToDivisors.length > 0) {
                // Select a divisor from the restricted list
                const divisorIndex = Math.floor(Math.random() * params.restrictToDivisors.length);
                divisor = params.restrictToDivisors[divisorIndex];
            } else {
                // For standard generation
                divisor = this._getRandomInt(effectiveMinDivisor, params.maxDivisor);
            }

            // Generate a larger result for a larger dividend
            result = this._getRandomInt(effectiveMinResult, params.maxResult);

            // For easy mental calculations, ensure clean division
            if (params.restrictToEasyCalculations) {
                dividend = divisor * result;
            } else if (params.allowRemainder) {
                // If remainders are allowed, we can be more flexible
                const remainder = this._getRandomInt(0, divisor - 1);
                dividend = divisor * result + remainder;
                answer = params.allowRemainder ? dividend / divisor : result;
            } else {
                dividend = divisor * result;
            }

            // For Year 5, include specific examples like 120 ÷ 8 = 15
            if (divisor === 8 && Math.random() < 0.3) {
                dividend = 120;
                result = 15;
            }

            return {
                expression: `${dividend} ${this.symbol} ${divisor}`,
                answer: params.allowRemainder ? parseFloat((dividend / divisor).toFixed(2)) : result,
                operands: [dividend, divisor]
            };
        }

        // Handle single-digit divisor problems (for Year 2 and 3)
        if (params.singleDigitDivisorOnly) {
            if (params.restrictToDivisors && params.restrictToDivisors.length > 0) {
                // Select a divisor from the restricted list
                const divisorIndex = Math.floor(Math.random() * params.restrictToDivisors.length);
                divisor = params.restrictToDivisors[divisorIndex];
            } else {
                // For standard generation with single-digit divisor
                divisor = this._getRandomInt(effectiveMinDivisor, 9);
            }

            // Generate a result within the specified range
            result = this._getRandomInt(effectiveMinResult, params.maxResult);

            // For clean division
            dividend = divisor * result;

            // For Year 3, include specific examples like 48 ÷ 8 = 6
            if (divisor === 8 && Math.random() < 0.3) {
                dividend = 48;
                result = 6;
            }

            return {
                expression: `${dividend} ${this.symbol} ${divisor}`,
                answer: result,
                operands: [dividend, divisor]
            };
        }

        // Standard division generation
        if (params.restrictToDivisors && params.restrictToDivisors.length > 0) {
            // Select a divisor from the restricted list
            const divisorIndex = Math.floor(Math.random() * params.restrictToDivisors.length);
            divisor = params.restrictToDivisors[divisorIndex];
        } else {
            // For standard generation
            divisor = this._getRandomInt(effectiveMinDivisor, params.maxDivisor);
        }

        result = this._getRandomInt(effectiveMinResult, params.maxResult);

        if (params.restrictToEasyCalculations) {
            // For easy mental calculations, ensure clean division with simple numbers
            dividend = divisor * result;
        } else if (!params.allowRemainder) {
            // For clean division (no remainder)
            dividend = divisor * result;
        } else {
            // If remainders are allowed, we can be more flexible
            const minDividend = divisor * (effectiveMinResult);
            const maxDividend = divisor * (params.maxResult) + (divisor - 1);
            dividend = this._getRandomInt(minDividend, maxDividend);
        }

        return {
            expression: `${dividend} ${this.symbol} ${divisor}`,
            // If remainders are allowed, we might want to return the full answer
            answer: params.allowRemainder ? parseFloat((dividend / divisor).toFixed(2)) : result,
            operands: [dividend, divisor]
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