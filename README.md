# Math Problem Generator

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
<!-- Add other badges here if applicable, e.g., npm version, build status -->

A lightweight, dependency-free JavaScript library for generating curriculum-aligned math problems tailored for UK primary school students from Reception to Year 6.

## Overview

This library provides a simple interface to generate age-appropriate math problems covering addition, subtraction, multiplication, division, and squared numbers. It's designed for educational applications, games, or practice tools targeting UK primary school children (ages 4-11).

The core functionality revolves around the `generateProblem` function, which creates a problem object containing the question (`expression`) and the `answer`. You can specify the desired `yearLevel` and `type` of problem, or let the library choose randomly based on typical curriculum expectations for the level. The `checkAnswer` function helps validate user input, handling numeric and string inputs gracefully, including tolerance for floating-point comparisons. Utility functions (`getYearLevels`, `getProblemTypes`) and constants (`YEAR_LEVELS`, `PROBLEM_TYPES`) are provided for convenience.

## Key Features

*   **Curriculum-Aligned:** Generates age-appropriate math problems for UK primary school students (Reception to Year 6, ages 4-11).
*   **Variety of Problem Types:** Supports addition, subtraction, multiplication, division, and squared number problems.
*   **Adaptive Difficulty:** Problems adjust complexity based on the specified year level.
*   **Simple API:** Easy to integrate with just a few key functions.
*   **Flexible Generation:** Specify year level, problem type, or let the library choose randomly.
*   **Robust Answer Checking:** Handles numeric/string inputs and floating-point comparisons.
*   **Zero Dependencies:** Lightweight and easy to add to any project.
*   **ESM Format:** Modern JavaScript module format.

## Installation

```bash
npm install maths-game-problem-generator
```

*(Note: The package name in `package.json` is `maths-game-problem-generator`. Ensure your installation command matches this name).*

## Quick Start

```js
import { generateProblem, checkAnswer } from 'maths-game-problem-generator';

// Generate a Year 3 division problem
const problem = generateProblem({
  yearLevel: 'year3',
  type: 'division'
});

// The problem object contains expression, answer, and other details
console.log(`Problem: ${problem.expression}`); // Example: "Problem: 36 ÷ 9"
console.log(`Answer: ${problem.answer}`);       // Example: "Answer: 4"
console.log(`Formatted Answer: ${problem.formattedAnswer}`); // Example: "Formatted Answer: 4"

// Check if a user's answer is correct
const userAnswer = 4;
const isCorrect = checkAnswer(problem, userAnswer);
console.log(`Is the user's answer correct? ${isCorrect}`); // Output: "Is the user's answer correct? true"
```

## Usage Guide

This guide explains how to use the primary functions of the library.

### Importing

Import the necessary functions and constants from the library:

```js
import {
  generateProblem,
  checkAnswer,
  getYearLevels,
  getProblemTypes,
  YEAR_LEVELS,
  PROBLEM_TYPES
} from 'maths-game-problem-generator';

// Or import the default object
import MathProblemGenerator from 'maths-game-problem-generator';
// const problem = MathProblemGenerator.generateProblem(...);
```

### Generating Problems (`generateProblem`)

The `generateProblem` function creates a math problem.

```js
// Generate a problem with default options (Reception, random type)
const defaultProblem = generateProblem();

// Generate a problem for a specific year level (random type)
const year2Problem = generateProblem({ yearLevel: 'year2' });
// Using constants for year level:
const year4Problem = generateProblem({ yearLevel: YEAR_LEVELS.YEAR4 });

// Generate a problem of a specific type (default year: Reception)
const additionProblem = generateProblem({ type: 'addition' });
// Using constants for problem type:
const multiplicationProblem = generateProblem({ type: PROBLEM_TYPES.MULTIPLICATION });

// Generate a problem for a specific year and type
const year5SquaredProblem = generateProblem({
  yearLevel: YEAR_LEVELS.YEAR5,
  type: PROBLEM_TYPES.SQUARED
});
```

The function returns a `Problem Object` with the following structure:

*   `expression` (string): The full math problem expression (e.g., "15 + 7", "Half 10", "√81").
*   `expression_short` (string): A potentially shorter version of the expression, suitable for constrained UI elements (e.g., "15+7", "10÷2", "81mod5"). Falls back to `expression` if no specific short version is defined.
*   `answer` (number): The correct numerical answer.
*   `formattedAnswer` (string): The answer formatted as a string, handling potential floating-point inaccuracies for display (e.g., "0.1" instead of "0.1000000001").
*   `type` (string): The type of problem generated (e.g., 'addition', 'division').
*   `yearLevel` (string): The year level the problem was generated for (e.g., 'year1', 'year6').

### Checking Answers (`checkAnswer`)

Use `checkAnswer` to validate a user's response against the problem's correct answer.

```js
const problem = generateProblem({ yearLevel: 'year4', type: 'addition' }); // e.g., 45 + 55 = 100
console.log(`Problem: ${problem.expression}`);

let userAnswer = 100;
let isCorrect = checkAnswer(problem, userAnswer);
console.log(`Answer ${userAnswer} is correct? ${isCorrect}`); // true

userAnswer = "100"; // Handles string input
isCorrect = checkAnswer(problem, userAnswer);
console.log(`Answer "${userAnswer}" is correct? ${isCorrect}`); // true

userAnswer = 99;
isCorrect = checkAnswer(problem, userAnswer);
console.log(`Answer ${userAnswer} is correct? ${isCorrect}`); // false

// Example with decimals
const decimalProblem = generateProblem({ yearLevel: 'year6', type: 'division' }); // e.g., 1 ÷ 4 = 0.25
console.log(`Problem: ${decimalProblem.expression}`);
isCorrect = checkAnswer(decimalProblem, 0.25); // true
isCorrect = checkAnswer(decimalProblem, "0.25"); // true
isCorrect = checkAnswer(decimalProblem, 0.250000001); // true (due to tolerance)
isCorrect = checkAnswer(decimalProblem, 0.24); // false
```

### Getting Available Options

You can retrieve lists of supported year levels and problem types.

```js
const availableYears = getYearLevels();
console.log('Supported Year Levels:', availableYears);
// Output: ['reception', 'year1', 'year2', 'year3', 'year4', 'year5', 'year6']

const availableTypes = getProblemTypes();
console.log('Supported Problem Types:', availableTypes);
// Output: ['addition', 'subtraction', 'multiplication', 'division', 'squared']
```

### Using Constants

For more readable and maintainable code, use the exported constants:

```js
import { YEAR_LEVELS, PROBLEM_TYPES } from 'maths-game-problem-generator';

const problem = generateProblem({
  yearLevel: YEAR_LEVELS.YEAR6,
  type: PROBLEM_TYPES.DIVISION
});
```

## API Reference

### `generateProblem(options)`

Generates a math problem based on the specified options.

*   **Parameters:**
    *   `options` (Object): Configuration options.
        *   `yearLevel` (string, optional): The school year level (see `YEAR_LEVELS`). Default: `'reception'`.
        *   `type` (string, optional): The type of math problem (see `PROBLEM_TYPES`). Default: Randomly selected based on `yearLevel`.
*   **Returns:**
    *   `(Object)`: A problem object with the following properties:
        *   `expression` (string): The math problem expression (e.g., "25 + 17").
        *   `expression_short` (string): A shorter representation, if available (e.g., "25+17").
        *   `answer` (number): The correct numerical answer (e.g., `42`).
        *   `formattedAnswer` (string): The answer formatted as a string for display (e.g., `"42"`, `"0.25"`).
        *   `type` (string): The problem type (e.g., `"addition"`).
        *   `yearLevel` (string): The year level (e.g., `"year3"`).

### `checkAnswer(problem, userAnswer)`

Checks if a user's answer is correct for a given problem, handling type differences and floating-point tolerance.

*   **Parameters:**
    *   `problem` (Object): The problem object returned by `generateProblem`.
    *   `userAnswer` (number | string): The user's submitted answer.
*   **Returns:**
    *   `(boolean)`: `true` if the `userAnswer` matches the `problem.answer` within tolerance, `false` otherwise. Returns `false` for non-numeric `userAnswer` strings.

### `getYearLevels()`

Returns an array of all available year level strings supported by the generator.

*   **Returns:**
    *   `Array<string>`: List of available year levels (e.g., `['reception', 'year1', ..., 'year6']`).

### `getProblemTypes()`

Returns an array of all available problem type strings supported by the generator.

*   **Returns:**
    *   `Array<string>`: List of available problem types (e.g., `['addition', 'subtraction', 'multiplication', 'division', 'squared']`).

### Constants

The library exports constants for year levels and problem types for convenience and code clarity.

```js
import { YEAR_LEVELS, PROBLEM_TYPES } from 'maths-game-problem-generator';

// Example usage:
const level = YEAR_LEVELS.YEAR2; // equivalent to 'year2'
const type = PROBLEM_TYPES.SUBTRACTION; // equivalent to 'subtraction'
```

*   **`YEAR_LEVELS`**: An object mapping uppercase year level names to their string values (e.g., `YEAR_LEVELS.RECEPTION` -> `'reception'`, `YEAR_LEVELS.YEAR1` -> `'year1'`, ... `YEAR_LEVELS.YEAR6` -> `'year6'`).
*   **`PROBLEM_TYPES`**: An object mapping uppercase type names to their string values (e.g., `PROBLEM_TYPES.ADDITION` -> `'addition'`, `PROBLEM_TYPES.SQUARED` -> `'squared'`).

## Year Levels and Problem Types

### Supported Year Levels

*   `reception`: Ages 4-5 (Numbers to 10, simple +/-).
*   `year1`: Ages 5-6 (Numbers to 20, +/- within 20, basic ×/÷).
*   `year2`: Ages 6-7 (Numbers to 100, 2-digit +/-, ×/÷ by 2, 5, 10).
*   `year3`: Ages 7-8 (Numbers to 1000, mental +/-, ×/÷ by 3, 4, 8).
*   `year4`: Ages 8-9 (Numbers beyond 1000, larger +/-, all tables ×/÷ up to 12x12).
*   `year5`: Ages 9-10 (Large numbers, decimals, factors, basic squares/cubes, ×/÷ by powers of 10).
*   `year6`: Ages 10-11 (Advanced decimals, fractions, percentages, complex mental strategies, square/cube recall).

### Supported Problem Types

*   `addition`: Addition problems.
*   `subtraction`: Subtraction problems.
*   `multiplication`: Multiplication problems.
*   `division`: Division problems (including remainder problems in Year 4+).
*   `squared`: Squared number problems (introduced formally around Year 5/6, simple versions earlier).

## Examples

### Generate problems of different types

```js
import { generateProblem, PROBLEM_TYPES, YEAR_LEVELS } from 'maths-game-problem-generator';

// Addition problem for Reception
const receptionAdd = generateProblem({
  yearLevel: YEAR_LEVELS.RECEPTION,
  type: PROBLEM_TYPES.ADDITION
});
console.log(receptionAdd);

// Multiplication problem for Year 4
const year4Multiply = generateProblem({
  yearLevel: YEAR_LEVELS.YEAR4,
  type: PROBLEM_TYPES.MULTIPLICATION
});
console.log(year4Multiply);

// Squared number problem for Year 6
const year6Square = generateProblem({
  yearLevel: YEAR_LEVELS.YEAR6,
  type: PROBLEM_TYPES.SQUARED
});
console.log(year6Square); // e.g., { expression: '√144', ..., answer: 12, ... }
```

### Generate multiple problems

```js
import { generateProblem, YEAR_LEVELS } from 'maths-game-problem-generator';

// Generate 5 random problems for Year 1
const problems = Array(5).fill().map(() =>
  generateProblem({ yearLevel: YEAR_LEVELS.YEAR1 })
);

problems.forEach((p, i) => console.log(`Problem ${i+1}: ${p.expression} = ${p.formattedAnswer}`));
```

## Contributing

Contributions are welcome! Please feel free to submit issues or pull requests on the GitHub repository.

## License

[MIT](LICENSE)