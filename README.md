# Maths Game Problem Generator

A lightweight JavaScript library for generating math problems of various difficulties. Designed for educational games and applications, this package can generate problems aligned with curriculum standards.

## Features

- Zero dependencies - pure JavaScript implementation
- Generates problems across three difficulty levels: easy, medium, and hard
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

// Create a problem of a specific difficulty ('easy', 'medium', or 'hard')
const problem = createMathProblem('medium');

// Get the expression to display to the user
const expression = getProblemExpression(problem);
console.log(expression); // e.g. "25 + 37"

// Get the correct answer for validation or score calculation
const answer = getAnswer(problem);
console.log(answer); // e.g. 62

// Validate a user's answer
const isCorrect = validateAnswer(problem, 62);
console.log(isCorrect); // true

// Get point value for this problem
const points = getPoints(problem);
console.log(points); // 30 (for medium difficulty)
```

### Advanced Usage (New API)

#### Creating Problems by Type

```javascript
import { createProblemOfType, getProblemExpression, getAnswer } from 'maths-game-problem-generator';

// Create a multiplication problem with medium difficulty
const multiplicationProblem = createProblemOfType('multiplication', 'medium');
console.log(getProblemExpression(multiplicationProblem)); // e.g. "6 × 8"
console.log(getAnswer(multiplicationProblem)); // e.g. 48

// Create an addition problem with hard difficulty
const additionProblem = createProblemOfType('addition', 'hard');
console.log(getProblemExpression(additionProblem)); // e.g. "47 + 85"
console.log(getAnswer(additionProblem)); // e.g. 132
```

#### Getting Available Types and Difficulties

```javascript
import { getAvailableProblemTypes, getAvailableDifficultyLevels } from 'maths-game-problem-generator';

// Get all available problem types
const types = getAvailableProblemTypes();
console.log(types); // ['addition', 'subtraction', 'multiplication', 'division']

// Get all available difficulty levels
const difficulties = getAvailableDifficultyLevels();
console.log(difficulties); // ['easy', 'medium', 'hard']
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

Each difficulty level provides appropriate parameters for each problem type:

### Easy
- Addition: Numbers 1-10
- Subtraction: Numbers 1-10 with positive results
- Multiplication: Numbers 1-5
- Division: Divisors 2-5, clean division only

### Medium
- Addition: Numbers 10-50
- Subtraction: Numbers 10-99 with positive results
- Multiplication: Numbers 2-12
- Division: Divisors 2-10, clean division only

### Hard
- Addition: Numbers 10-99
- Subtraction: Numbers 10-99 with positive results
- Multiplication: Numbers 5-12
- Division: Divisors 2-12, may include remainders

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