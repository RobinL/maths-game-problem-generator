# Math Game Problem Generator

A lightweight JavaScript library for generating math problems tailored to different UK primary school year levels.

## Features

- Generate age-appropriate math problems for UK primary school students (Reception to Year 4)
- Support for different problem types: addition, subtraction, multiplication, division
- Simple API with just a few key functions
- No dependencies
- ESM module format

## Installation

```bash
npm install math-game-problem-generator
```

## Quick Start

```javascript
import { generateProblem, checkAnswer } from 'math-game-problem-generator';

// Generate a Year 3 division problem
const problem = generateProblem({
  yearLevel: 'year3',
  type: 'division'
});

console.log(`Problem: ${problem.expression}`);
// Example output: "Problem: 36 ÷ 9"

console.log(`Answer: ${problem.answer}`);
// Example output: "Answer: 4"

// Check if a user's answer is correct
const userAnswer = 4;
const isCorrect = checkAnswer(problem, userAnswer);
console.log(`Is the answer correct? ${isCorrect}`);
// Output: "Is the answer correct? true"
```

## API Reference

### `generateProblem(options)`

Generates a math problem based on the specified options.

#### Parameters:

- `options` (Object): Configuration options
  - `yearLevel` (string, optional): The school year level. Default: 'reception'
  - `type` (string, optional): The type of math problem. Default: randomly selected

#### Returns:

- `Object`: A problem object with:
  - `expression` (string): The math problem expression
  - `answer` (number): The correct answer
  - `type` (string): The problem type
  - `yearLevel` (string): The year level

### `checkAnswer(problem, userAnswer)`

Checks if a user's answer is correct for a given problem.

#### Parameters:

- `problem` (Object): The problem object returned by `generateProblem`
- `userAnswer` (number|string): The user's answer

#### Returns:

- `boolean`: Whether the answer is correct

### `getYearLevels()`

Returns all available year levels.

#### Returns:

- `Array<string>`: List of available year levels (e.g., ['reception', 'year1', 'year2', ...])

### `getProblemTypes()`

Returns all available problem types.

#### Returns:

- `Array<string>`: List of available problem types (e.g., ['addition', 'subtraction', ...])

### Constants

The library also provides constants for easier reference:

```javascript
import { YEAR_LEVELS, PROBLEM_TYPES } from 'math-game-problem-generator';

// Available as:
// YEAR_LEVELS.RECEPTION, YEAR_LEVELS.YEAR1, YEAR_LEVELS.YEAR2, etc.
// PROBLEM_TYPES.ADDITION, PROBLEM_TYPES.SUBTRACTION, etc.
```

## Year Levels and Problem Types

### Year Levels

- `reception`: Reception class (ages 4-5)
- `year1`: Year 1 (ages 5-6)
- `year2`: Year 2 (ages 6-7)
- `year3`: Year 3 (ages 7-8)
- `year4`: Year 4 (ages 8-9)

### Problem Types

- `addition`: Addition problems
- `subtraction`: Subtraction problems
- `multiplication`: Multiplication problems
- `division`: Division problems

## Examples

### Generate problems of different types

```javascript
import { generateProblem, PROBLEM_TYPES } from 'math-game-problem-generator';

// Addition problem for Reception
const additionProblem = generateProblem({
  yearLevel: 'reception',
  type: PROBLEM_TYPES.ADDITION
});

// Multiplication problem for Year 2
const multiplicationProblem = generateProblem({
  yearLevel: 'year2',
  type: PROBLEM_TYPES.MULTIPLICATION
});
```

### Generate multiple problems

```javascript
import { generateProblem, YEAR_LEVELS } from 'math-game-problem-generator';

// Generate 5 problems for Year 1
const problems = Array(5).fill().map(() =>
  generateProblem({ yearLevel: YEAR_LEVELS.YEAR1 })
);
```

## License

MIT