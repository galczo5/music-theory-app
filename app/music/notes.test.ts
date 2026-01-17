import { expect, test } from 'vitest';
import { interval, Note, notesArray } from '~/music/notes';

test('notesArray contains 12 values', () => {
  expect(notesArray.length).eq(12);
});

test('interval should calculate difference between lower and higher note', () => {
  const result = interval(Note.C, Note.D);
  expect(result).eq(2);
});

test('interval should calculate difference between higher and lower note', () => {
  const result = interval(Note.D, Note.C);
  expect(result).eq(2);
});

test('interval should calculate difference between the same note', () => {
  const result = interval(Note.D, Note.D);
  expect(result).eq(0);
});
