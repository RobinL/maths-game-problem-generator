# Maths Game Problem Generator

A lightweight JavaScript library for generating math problems of various difficulties. Designed for educational games and applications, this package can generate problems aligned with curriculum standards.

## Features

- Zero dependencies - pure JavaScript implementation
- Generates problems across seven UK primary school year levels: Reception, Year 1, Year 2, Year 3, Year 4, Year 5, and Year 6
- Provides expression formatting and answer validation
- Assigns point values based on difficulty
- Suitable for educational games and applications
- **NEW**: Problem types are now decoupled from difficulty levels
- **NEW**: Easily extend with new problem types
- **NEW**: Create custom difficulty configurations
- **NEW**: Target specific problem types with customized difficulty

## Installation

Install locally (during development):

```bash
npm install --save path/to/maths-game-problem-generator
```

Once published to npm (future):

```bash
npm install --save maths-game-problem-generator
```

## Usage

### Basic Usage (Original API)

```javascript
import { createMathProblem, getProblemExpression, getAnswer, validateAnswer, getPoints } from 'maths-game-problem-generator';

// Create a problem of a specific difficulty level ('reception', 'year1', 'year2', 'year3', 'year4', 'year5', or 'year6')
const problem = createMathProblem('year3');

// Get the expression to display to the user
const expression = getProblemExpression(problem);
console.log(expression); // e.g. "30 + 40"

// Get the correct answer for validation or score calculation
const answer = getAnswer(problem);
console.log(answer); // e.g. 70

// Validate a user's answer
const isCorrect = validateAnswer(problem, 70);
console.log(isCorrect); // true

// Get point value for this problem
const points = getPoints(problem);
console.log(points); // 25 (for year3 difficulty)
```

### Advanced Usage (New API)

#### Creating Problems by Type

```javascript
import { createProblemOfType, getProblemExpression, getAnswer } from 'maths-game-problem-generator';

// Create a multiplication problem with Year 3 difficulty
const multiplicationProblem = createProblemOfType('multiplication', 'year3');
console.log(getProblemExpression(multiplicationProblem)); // e.g. "5 × 8"
console.log(getAnswer(multiplicationProblem)); // e.g. 40

// Create an addition problem with Year 6 difficulty
const additionProblem = createProblemOfType('addition', 'year6');
console.log(getProblemExpression(additionProblem)); // e.g. "247 + 153"
console.log(getAnswer(additionProblem)); // e.g. 400
```

#### Getting Available Types and Difficulties

```javascript
import { getAvailableProblemTypes, getAvailableDifficultyLevels } from 'maths-game-problem-generator';

// Get all available problem types
const types = getAvailableProblemTypes();
console.log(types); // ['addition', 'subtraction', 'multiplication', 'division']

// Get all available difficulty levels
const difficulties = getAvailableDifficultyLevels();
console.log(difficulties); // ['reception', 'year1', 'year2', 'year3', 'year4', 'year5', 'year6']
```

#### Creating Custom Problem Types

```javascript
import { ProblemType, DifficultyLevel, MathProblem } from 'maths-game-problem-generator';

// Create a custom problem type for squaring numbers
class SquaringProblem extends ProblemType {
    constructor() {
        super('squaring');
        this.symbol = '²';
    }

    generate(params) {
        const value = this._getRandomInt(params.minValue, params.maxValue);
        return {
            expression: `${value}${this.symbol}`,
            answer: value * value,
            operands: [value]
        };
    }

    _getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}

// Create a custom difficulty level for your curriculum
const year3Level = new DifficultyLevel('year3', 25, {
    default: {
        minValue: 5,
        maxValue: 20
    },
    addition: {
        minValue: 10,
        maxValue: 100
    },
    squaring: {
        minValue: 2,
        maxValue: 10
    }
});

// Create a custom math problem
const squaringProblem = new MathProblem(new SquaringProblem(), year3Level);
console.log(squaringProblem.expression); // e.g. "7²"
console.log(squaringProblem.answer); // e.g. 49
```

## Problem Types

### Addition
- Simple addition with parameters for minimum and maximum values

```
5 + 3 = 8
25 + 37 = 62
```

### Subtraction
- Subtraction with parameters for ensuring positive results

```
9 - 4 = 5
45 - 23 = 22
```

### Multiplication
- Multiplication with parameters for minimum and maximum values

```
6 × 8 = 48
12 × 11 = 132
```

### Division
- Division with parameters for divisor range and whether to allow remainders

```
45 / 9 = 5
27 / 3 = 9
```

## Difficulty Levels

Each difficulty level provides appropriate parameters for each problem type based on UK primary school age-related expectations:

### Reception (Ages 4-5)
- Addition: Numbers 1-5
- Subtraction: Numbers 1-5 with positive results
- Multiplication: Simple doubling of numbers 1-2
- Division: Simple sharing with divisor of 2
- Focus on counting, number recognition, and simple operations

### Year 1 (Ages 5-6)
- Addition: Numbers 1-10
- Subtraction: Numbers 1-10 with positive results
- Multiplication: Doubling small numbers up to 5
- Division: Halving small numbers
- Focus on number bonds to 10 and counting in 2s, 5s, 10s

### Year 2 (Ages 6-7)
- Addition: Numbers 10-20
- Subtraction: Numbers 10-20 with positive results
- Multiplication: 2, 5, 10 times tables
- Division: Division with 2, 5, 10
- Focus on two-digit numbers without carrying/borrowing

### Year 3 (Ages 7-8)
- Addition: Two-digit sums in multiples of 10 (e.g., 30 + 40)
- Subtraction: Two-digit differences in multiples of 10 (e.g., 80 - 50)
- Multiplication: 2, 3, 4, 5, 8, 10 times tables
- Division: Division with 2, 3, 4, 5, 8, 10
- Focus on place value and fractions

### Year 4 (Ages 8-9)
- Addition: Three-digit sums without carrying (e.g., 340 + 250)
- Subtraction: Three-digit differences without borrowing (e.g., 570 - 340)
- Multiplication: All tables up to 12×12
- Division: Division with tables up to 12
- Focus on multiplying and dividing by 10 and 100

### Year 5 (Ages 9-10)
- Addition: Two-digit sums (e.g., 68 + 25)
- Subtraction: Two-digit differences (e.g., 83 - 47)
- Multiplication: Multiply by 10, 100
- Division: Divide by 10, 100
- Focus on fractions, decimals, and percentages

### Year 6 (Ages 10-11)
- Addition: Three-digit sums if simple (e.g., 340 + 260)
- Subtraction: Three-digit differences if simple (e.g., 500 - 240)
- Multiplication: Mental multiplication with easy numbers (e.g., 25 × 4)
- Division: Mental division with easy numbers (e.g., 240 ÷ 6)
- Focus on fractions, decimals, percentages, and order of operations

## Demo Application

The package includes a demo application to showcase the different types of math problems generated.

### Running the Demo

```bash
npm run demo
```

This will start a local web server and open the demo page in your browser.

## Project Structure

```
maths-game-problem-generator/
├── index.js                # Main entry point and API
├── package.json            # Package configuration
├── server.js               # Demo server
├── demo/
│   └── index.html          # Demo web application
└── src/
    ├── problems/
    │   ├── MathProblem.js           # Math problem combining type + difficulty
    │   ├── ProblemGenerator.js      # Factory for creating problems
    │   └── types/
    │       ├── ProblemType.js       # Base class for problem types
    │       ├── AdditionProblem.js   # Addition implementation
    │       ├── SubtractionProblem.js # Subtraction implementation
    │       ├── MultiplicationProblem.js # Multiplication implementation
    │       └── DivisionProblem.js   # Division implementation
    ├── difficulty/
    │   └── DifficultyLevel.js      # Difficulty level definitions
    └── utils/
        └── helpers.js              # Utility functions
```

## License

MIT