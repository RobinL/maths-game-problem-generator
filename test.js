import assert from 'node:assert/strict';
import { generateProblem, createMultipleChoiceAnswers } from './index.js';

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

console.log('All tests passed.');
