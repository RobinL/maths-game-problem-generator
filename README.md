# Math Problem Generator

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A lightweight, zero-dependency JavaScript library for generating curriculum-aligned math problems for UK primary school students (Reception to Year 6, ages 4-11).

## Installation

```bash
npm install maths-game-problem-generator
```

## Quick Start

```js
import { generateProblem, checkAnswer } from 'maths-game-problem-generator';

// Generate a Year 3 division problem
const problem = generateProblem({
  yearLevel: 'year3',
  type: 'division',
  multipleChoice: true
});

console.log(problem.expression);      // e.g., "72 ÷ 8"
console.log(problem.answer);          // e.g., 9
console.log(problem.formattedAnswer); // e.g., "9"
console.log(problem.choices);         // e.g., ["8", "9", "11", "12"]

// Check a user's answer
const isCorrect = checkAnswer(problem, 9);  // true
const alsoCorrect = checkAnswer(problem, "9");  // true (strings work too)

// Generate a fractions problem
const fractionProblem = generateProblem({
  yearLevel: 'year5',
  type: 'fraction',
  multipleChoice: true
});

console.log(fractionProblem.expression); // e.g., "3/4 of 40"
console.log(fractionProblem.answer);     // e.g., 30
```

## API

### `generateProblem(options)`

Generates a math problem.

```js
// Default: Reception level, random type
const problem = generateProblem();

// Specific year level (random type for that year)
const year2Problem = generateProblem({ yearLevel: 'year2' });

// Specific type (default year: Reception)
const addProblem = generateProblem({ type: 'addition' });

// Both year and type
const year5Cube = generateProblem({ yearLevel: 'year5', type: 'cube' });
```

**Returns** a problem object:

| Property | Type | Description |
|----------|------|-------------|
| `expression` | string | The problem (e.g., `"15 + 7"`, `"√81"`, `"2³"`) |
| `expression_short` | string | Shorter version for compact UIs (e.g., `"15+7"`) |
| `answer` | number|string | The correct answer. Most problems use numbers; symbolic fraction problems use display strings such as `"2/4"` |
| `formattedAnswer` | string | Answer as a display string (handles decimals cleanly) |
| `type` | string | Problem type (e.g., `"addition"`, `"squared"`) |
| `yearLevel` | string | Year level (e.g., `"year3"`) |
| `subtype` | string | Optional curriculum-oriented subtype (e.g., `"fraction_of_amount_operator"`) |
| `expectedAnswer` | object | Optional structured answer metadata for fraction-aware checking |

When called with `{ multipleChoice: true }`, the returned object also includes:

| Property | Type | Description |
|----------|------|-------------|
| `choices` | string[] | Plausible answer choices including the correct answer |
| `correctChoice` | string | The correct answer as a display string |

### `checkAnswer(problem, userAnswer)`

Validates a user's answer. Handles strings, numbers, and floating-point tolerance.

```js
checkAnswer(problem, 42);      // true if answer is 42
checkAnswer(problem, "42");    // true (string input works)
checkAnswer(problem, 0.25);    // handles decimals with tolerance
checkAnswer({ answer: "1/2", expectedAnswer: { kind: "fraction", numerator: 1, denominator: 2 } }, "2/4");
// true: equivalent fractions work when expectedAnswer is present
```

### `getYearLevels()` / `getProblemTypes()`

Get available options:

```js
getYearLevels();
// ['reception', 'year1', 'year2', 'year3', 'year4', 'year5', 'year6']

getProblemTypes();
// ['addition', 'subtraction', 'multiplication', 'division', 'squared', 'cube', 'fraction']
```

### Constants

Use constants for cleaner code:

```js
import { YEAR_LEVELS, PROBLEM_TYPES } from 'maths-game-problem-generator';

generateProblem({
  yearLevel: YEAR_LEVELS.YEAR6,
  type: PROBLEM_TYPES.SQUARED
});
```

### Default Export

```js
import MathProblemGenerator from 'maths-game-problem-generator';

MathProblemGenerator.generateProblem({ yearLevel: 'year3' });
MathProblemGenerator.checkAnswer(problem, answer);
MathProblemGenerator.getYearLevels();
MathProblemGenerator.getProblemTypes();
MathProblemGenerator.yearLevels;   // Same as YEAR_LEVELS
MathProblemGenerator.problemTypes; // Same as PROBLEM_TYPES
```

## Year Levels

| Level | Ages | Focus |
|-------|------|-------|
| `reception` | 4-5 | Numbers to 10, simple +/- |
| `year1` | 5-6 | Numbers to 20, +/- within 20 |
| `year2` | 6-7 | Numbers to 100, ×/÷ by 2, 5, 10 |
| `year3` | 7-8 | Numbers to 1000, ×/÷ by 3, 4, 8 |
| `year4` | 8-9 | Larger numbers, all tables up to 12×12, non-unit fractions |
| `year5` | 9-10 | Decimals, fractions as operators, squares, cubes, powers of 10 |
| `year6` | 10-11 | Advanced mental strategies, upper-primary fractions, square/cube recall |

## Problem Types

| Type | Description |
|------|-------------|
| `addition` | Addition problems |
| `subtraction` | Subtraction problems |
| `multiplication` | Multiplication problems |
| `division` | Division problems (remainders in Year 4+) |
| `squared` | Square numbers and square roots |
| `cube` | Cube numbers (Year 5-6 only) |
| `fraction` | Fraction questions, including fraction-of-quantity, equivalence, comparison, and selected operations |

## Examples

```js
import { generateProblem, YEAR_LEVELS, PROBLEM_TYPES } from 'maths-game-problem-generator';

// Generate 5 random Year 1 problems
const problems = Array(5).fill().map(() =>
  generateProblem({ yearLevel: YEAR_LEVELS.YEAR1 })
);

problems.forEach((p, i) =>
  console.log(`${i+1}. ${p.expression} = ${p.formattedAnswer}`)
);

// Year 6 squared problem (includes square roots)
const squared = generateProblem({
  yearLevel: YEAR_LEVELS.YEAR6,
  type: PROBLEM_TYPES.SQUARED
});
// e.g., { expression: '√144', answer: 12, ... }

// Year 5 cube problem
const cubed = generateProblem({
  yearLevel: 'year5',
  type: 'cube'
});
// e.g., { expression: '2³', answer: 8, ... }

// Year 5 fraction problem
const fraction = generateProblem({
  yearLevel: 'year5',
  type: PROBLEM_TYPES.FRACTION,
  multipleChoice: true
});
// e.g., { expression: 'three quarters of 40', answer: 30, choices: ['10', '30', '40', '34'], ... }
```

## License

[MIT](LICENSE)
