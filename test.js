import assert from 'node:assert/strict';
import { generateProblem, createMultipleChoiceAnswers, checkAnswer, getProblemTypes, PROBLEM_TYPES } from './index.js';

const plainProblem = generateProblem({ yearLevel: 'year3', type: 'multiplication' });
assert.equal(Array.isArray(plainProblem.choices), false);
assert.equal('correctChoice' in plainProblem, false);

const multipleChoiceProblem = generateProblem({
    yearLevel: 'year3',
    type: 'multiplication',
    multipleChoice: true,
    choiceCount: 4
});

assert.equal(multipleChoiceProblem.choices.length, 4);
assert.equal(new Set(multipleChoiceProblem.choices).size, 4);
assert.equal(multipleChoiceProblem.correctChoice, multipleChoiceProblem.formattedAnswer);
assert.ok(multipleChoiceProblem.choices.includes(multipleChoiceProblem.correctChoice));

const choices = createMultipleChoiceAnswers({
    expression: '4 × 5',
    answer: 20,
    formattedAnswer: '20',
    type: 'multiplication',
    yearLevel: 'year3'
}, { choiceCount: 4 });

assert.equal(choices.length, 4);
assert.equal(new Set(choices).size, 4);
assert.ok(choices.includes('20'));
assert.ok(choices.some((choice) => ['15', '19', '21', '25', '30'].includes(choice)));

assert.ok(getProblemTypes().includes('fraction'));
assert.equal(PROBLEM_TYPES.FRACTION, 'fraction');

const fractionProblem = generateProblem({
    yearLevel: 'year5',
    type: 'fraction',
    multipleChoice: true,
    choiceCount: 4
});

assert.equal(fractionProblem.type, 'fraction');
assert.equal(fractionProblem.choices.length, 4);
assert.equal(new Set(fractionProblem.choices).size, 4);
assert.ok(fractionProblem.choices.includes(fractionProblem.correctChoice));
assert.ok('subtype' in fractionProblem);

if (typeof fractionProblem.answer === 'number') {
    assert.equal(checkAnswer(fractionProblem, fractionProblem.answer), true);
}

const symbolicFractionChoices = createMultipleChoiceAnswers({
    expression: 'Which fraction is equal to 1/2?',
    answer: '2/4',
    formattedAnswer: '2/4',
    type: 'fraction',
    yearLevel: 'year2',
    choices: ['2/4', '1/4', '3/4', '2/3'],
    expectedAnswer: { kind: 'fraction', numerator: 2, denominator: 4 }
}, { choiceCount: 4 });

assert.equal(symbolicFractionChoices.length, 4);
assert.ok(symbolicFractionChoices.includes('2/4'));

assert.equal(checkAnswer({
    answer: '1/2',
    formattedAnswer: '1/2',
    expectedAnswer: { kind: 'fraction', numerator: 1, denominator: 2 }
}, '2/4'), true);

assert.equal(checkAnswer({
    answer: '3/4',
    formattedAnswer: '3/4',
    expectedAnswer: { kind: 'fractionString', value: '3/4' }
}, '3/4'), true);

console.log('All tests passed.');
