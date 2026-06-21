# Deep research prompt: UK primary fractions coverage for maths-game-problem-generator

## Current library baseline

Repository: `maths-game-problem-generator`

The library currently generates arithmetic problems for these difficulty levels:

- `reception`
- `year1`
- `year2`
- `year3`
- `year4`
- `year5`
- `year6`

The public problem types are:

- `addition`
- `subtraction`
- `multiplication`
- `division`
- `squared`
- `cube`

There is currently no dedicated `fraction` problem type, no fraction-specific class, and no question template that directly asks for quantities like:

- `three quarters of 40`
- `one quarter of 100`
- `1/4 of 100`
- `3/4 of 40`
- `what is one third of 30?`
- `find two fifths of 25`

The only fraction-adjacent behaviour found in the current implementation is:

- Reception division can ask halving questions such as `Half 8`.
- Year 1 division can ask halving questions such as `Half 14`, basic division by 2, and simple sharing questions such as `Share 12 equally between 3`.
- Year 6 division can produce clean decimal results from divisions such as `1 ÷ 4 = 0.25`, but these are expressed as division, not as fractions.
- Years 4, 5, and 6 include decimal arithmetic in some addition, subtraction, multiplication, or division templates, but not fraction notation or fraction-of-quantity wording.

Some README and demo text mentions fractions or advanced fraction knowledge for older years, but the implementation does not currently appear to generate explicit fraction questions.

## Current fraction-related behaviour by level

### Reception

Implemented fraction-adjacent questions:

- Halving only, via `ReceptionDivisionProblem`.
- Example expression: `Half 8`.
- Internally this is division by 2 with even dividends from 2 to 10.

Not implemented:

- Quartering.
- Equal parts of shapes or objects.
- Fraction notation.
- Fraction-of-quantity questions beyond half.
- Wording such as `one quarter of 8`.

### Year 1

Implemented fraction-adjacent questions:

- Halving even numbers up to 20.
- Division by 2.
- Sharing a small number equally between 2 to 5 groups.
- Example expressions: `Half 12`, `16 ÷ 2`, `Share 12 equally between 3`.

Not implemented:

- Quartering as a named fraction.
- Recognising or finding halves and quarters using fraction language.
- Fraction notation.
- Fraction-of-quantity questions such as `one quarter of 20`.

### Year 2

Implemented fraction-adjacent questions:

- No explicit fraction questions.
- Division by 2, 5, and 10 from times-table facts.
- Example expressions: `20 ÷ 2`, `50 ÷ 5`, `80 ÷ 10`.

Not implemented:

- `1/2`, `1/3`, `1/4`, `2/4`, `3/4`.
- Finding fractions of quantities.
- Unit fraction or non-unit fraction language.
- Equivalence such as `2/4 = 1/2`.

### Year 3

Implemented fraction-adjacent questions:

- No explicit fraction questions.
- Division using 3, 4, 8, and previously learned tables.
- Example expressions: `24 ÷ 3`, `32 ÷ 4`, `64 ÷ 8`.

Not implemented:

- Unit fractions of quantities.
- Non-unit fractions of quantities.
- Tenths.
- Equivalent fractions.
- Adding/subtracting fractions.
- Comparing or ordering fractions.

### Year 4

Implemented fraction-adjacent questions:

- No explicit fraction questions.
- Division facts for all multiplication tables up to 12 x 12.
- Remainder questions.
- Some decimal addition/subtraction elsewhere in the year 4 generators.

Not implemented:

- Hundredths.
- Fraction-decimal links.
- Equivalent fractions.
- Adding/subtracting fractions with the same denominator.
- Fractions of quantities.
- Mixed numbers or improper fractions.

### Year 5

Implemented fraction-adjacent questions:

- No explicit fraction questions.
- Decimal addition and subtraction.
- Multiplying and dividing decimals by 10, 100, and 1000.
- Division strategies using factors and multiples.

Not implemented:

- Comparing and ordering fractions.
- Equivalent fractions.
- Converting improper fractions and mixed numbers.
- Adding/subtracting fractions.
- Multiplying proper fractions or mixed numbers by whole numbers.
- Fractions as operators, such as `3/4 of 40`.
- Percentages as fraction equivalents.

### Year 6

Implemented fraction-adjacent questions:

- No explicit fraction questions.
- Decimal arithmetic.
- Division with clean decimal results, for example `1 ÷ 4 = 0.25`.
- Some comments mention "fractional results", but generated expressions are still division expressions.

Not implemented:

- Simplifying fractions.
- Comparing and ordering fractions with different denominators.
- Adding/subtracting fractions with different denominators.
- Multiplying pairs of simple fractions.
- Dividing proper fractions by whole numbers.
- Fraction, decimal, and percentage equivalence questions.
- Ratio/proportion questions involving fractions.
- Fraction-of-quantity questions such as `three quarters of 40`.

## Known implementation gap

The library currently treats fraction-adjacent learning mostly as division, halving, sharing, and decimals. It does not model fractions as first-class question content.

This means a child using the library would not currently practise many common UK primary-school fraction skills, especially:

- naming halves, quarters, thirds, fifths, tenths, and hundredths;
- finding unit fractions of quantities;
- finding non-unit fractions of quantities;
- recognising equivalent fractions;
- comparing and ordering fractions;
- converting between improper fractions and mixed numbers;
- adding, subtracting, multiplying, or dividing fractions;
- connecting fractions, decimals, and percentages;
- applying fractions in word problems.

## Research task for a deep research agent

You are a deep research agent. Research the UK primary school curriculum and reliable UK education guidance to determine what fraction knowledge and question types children are expected to handle at each primary level:

- Reception
- Year 1
- Year 2
- Year 3
- Year 4
- Year 5
- Year 6

The goal is to produce a practical report that can be used to introduce fraction questions into the `maths-game-problem-generator` library.

### Sources to prioritise

Prioritise official and high-quality UK sources, including:

- Department for Education national curriculum documents for England.
- Early Years Foundation Stage guidance for Reception.
- NCETM guidance and progression materials.
- White Rose Maths progression documents, if available and citable.
- Other reputable UK primary maths curriculum resources where they clarify progression or question wording.

For every curriculum claim, include a citation with a URL and enough context to verify it.

### Questions to answer

For each level from Reception to Year 6, answer:

1. What fraction concepts are children expected to understand?
2. What kinds of fraction questions should they be able to answer mentally or fluently?
3. What vocabulary and notation should be used at that level?
4. What denominators are appropriate at that level?
5. Should questions involve shapes, sets/objects, numbers, measures, or abstract notation?
6. Should the child be asked for a whole-number answer, a fraction answer, a decimal answer, a percentage answer, or a comparison?
7. Which question types are suitable for a fast multiple-choice game?
8. Which question types are unsuitable for this library unless the UI supports diagrams, free-text fractions, or multi-step working?

### Output format

Produce a report with the following sections.

#### 1. Executive summary

Summarise the recommended fraction progression for the library in 10 to 15 bullet points.

#### 2. Year-by-year curriculum findings

For each level, include:

- expected concepts;
- expected vocabulary;
- expected notation;
- appropriate denominators;
- examples of age-appropriate questions;
- source citations.

#### 3. Recommended generator question types

Create a table with columns:

- Year level
- Question type name
- Example prompt
- Answer type
- Suggested multiple-choice distractors
- Curriculum rationale
- Implementation complexity

Include concrete question types such as:

- `half_of_quantity`
- `quarter_of_quantity`
- `unit_fraction_of_quantity`
- `non_unit_fraction_of_quantity`
- `equivalent_fraction`
- `compare_fractions`
- `order_fractions`
- `add_same_denominator`
- `subtract_same_denominator`
- `fraction_decimal_equivalence`
- `fraction_percentage_equivalence`
- `multiply_fraction_by_whole`
- `divide_fraction_by_whole`

Add or remove names based on the evidence.

#### 4. Multiple-choice design guidance

Recommend distractor strategies for each category, for example:

- denominator-only mistakes;
- numerator/denominator reversal;
- using the denominator as the answer;
- finding one quarter instead of three quarters;
- arithmetic slips from the relevant times table;
- equivalent decimal or percentage confusions.

Call out any distractors that may be pedagogically misleading or too unfair.

#### 5. Implementation recommendations for this library

Given the current library design, recommend:

- whether to add a new `fraction` problem type or fold fraction templates into existing types;
- how to preserve backwards compatibility;
- how to represent answers where the correct answer is a fraction;
- whether answers should be numeric, string-based, or structured objects;
- how to generate multiple-choice options for fraction answers;
- how to keep `checkAnswer` working for old numeric problems;
- what should appear in `expression`, `expression_short`, `answer`, and `formattedAnswer`.

#### 6. Prioritised roadmap

Produce a practical roadmap with:

- Phase 1: low-risk, high-value fraction-of-quantity questions.
- Phase 2: equivalence, comparison, and same-denominator operations.
- Phase 3: decimals, percentages, mixed numbers, and more advanced Year 5/6 topics.

For each phase, state which years it affects and give example generated questions.

### Important focus

Pay special attention to questions like:

- `one quarter of 100`
- `three quarters of 40`
- `one third of 30`
- `two fifths of 25`
- `three tenths of 80`

Determine exactly which UK primary years should encounter these question forms, what denominators and quantities are appropriate, and how the wording should evolve by year.

### Constraints for recommendations

The generator is used in a fast arithmetic game, so recommendations should prefer question types that:

- can be rendered as short text;
- have unambiguous answers;
- work well as multiple choice;
- do not require diagrams unless explicitly marked as needing future UI support;
- can be generated programmatically with predictable difficulty.

Avoid recommending implementation of diagram-heavy tasks as an immediate first step unless they are essential for Reception or Key Stage 1 coverage.
