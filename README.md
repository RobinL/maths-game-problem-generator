# Maths Game Problem Generator

A lightweight JavaScript library for generating math problems of various difficulties. Designed for educational games and applications, this package can generate problems aligned with curriculum standards.

## Features

- Zero dependencies - pure JavaScript implementation
- Generates problems across three difficulty levels: easy, medium, and hard
- Provides expression formatting and answer validation
- Assigns point values based on difficulty
- Suitable for educational games and applications

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

## Problem Types

### Easy Problems
- Simple addition with numbers 1-10
- Simple subtraction with positive answers

```
5 + 3 = 8
9 - 4 = 5
```

### Medium Problems
- Two-digit addition with numbers 10-50
- Two-digit subtraction with numbers 10-99
- Simple multiplication up to 12×12
- Simple division with no remainder

```
25 + 37 = 62
45 - 23 = 22
6 × 8 = 48
45 / 9 = 5
```

### Hard Problems
- Multiplication with numbers up to 12
- Two-digit addition and subtraction with larger numbers

```
12 × 11 = 132
87 - 29 = 58
64 + 38 = 102
```

## Demo Application

The package includes a simple demo application to showcase the different types of math problems generated.

### Running the Demo

```bash
npm run demo
```

This will start a local web server and open the demo page in your browser.

### About the Demo Server

The demo uses a custom Node.js server (server.js) that:

1. Serves the demo/index.html page
2. Properly handles ES modules with the correct MIME types
3. Provides detailed logging for debugging
4. Serves the library files directly without a build step

The demo web page demonstrates generating multiple problems of each difficulty level and displays them along with their answers and point values.

## Project Structure

```
maths-game-problem-generator/
├── index.js             # Main entry point and API
├── package.json         # Package configuration
├── server.js            # Demo server
├── demo/
│   └── index.html       # Demo web application
└── src/
    ├── problems/        # Problem implementations
    │   ├── MathProblem.js  # Base problem class
    │   ├── EasyMath.js     # Easy difficulty problems
    │   ├── MediumMath.js   # Medium difficulty problems
    │   └── HardMath.js     # Hard difficulty problems
    └── utils/
        └── helpers.js   # Utility functions
```

## License

MIT