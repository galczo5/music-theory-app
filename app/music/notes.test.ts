import { expect, test } from 'vitest';
import { FlatNote, flatNotesArray, getNoteStep, getNoteStepsArray, interval, Note, notesArray } from '~/music/notes';

test('notesArray contains 12 values', () => {
  expect(notesArray.length).eq(12);
});

test('interval should calculate difference between lower and higher note', () => {
  const result = interval(Note.C, Note.D);
  expect(result).eq(2);
});

test('interval should calculate difference between higher and lower note', () => {
  const result = interval(Note.D, Note.C);
  expect(result).eq(10);
});

test('interval should calculate difference between the same note', () => {
  const result = interval(Note.D, Note.D);
  expect(result).eq(0);
});

test('interval should calculate difference ', () => {
  const result = interval(Note.G, Note.A);
  expect(result).eq(2);
});

test('getNoteStep should return base note for all Note values', () => {
  const expectedResults: Record<Note, Note> = {
    [Note.C]: Note.C,
    [Note.CSharp]: Note.C,
    [Note.D]: Note.D,
    [Note.DSharp]: Note.D,
    [Note.E]: Note.E,
    [Note.F]: Note.F,
    [Note.FSharp]: Note.F,
    [Note.G]: Note.G,
    [Note.GSharp]: Note.G,
    [Note.A]: Note.A,
    [Note.ASharp]: Note.A,
    [Note.B]: Note.B
  };

  notesArray.forEach((note) => {
    const result = getNoteStep(note);
    expect(result).eq(expectedResults[note]);
  });
});

test('getNoteStep should return base note for all FlatNote values', () => {
  const expectedResults: Record<FlatNote, Note> = {
    [FlatNote.CFlat]: Note.C,
    [FlatNote.DFlat]: Note.D,
    [FlatNote.EFlat]: Note.E,
    [FlatNote.FFlat]: Note.F,
    [FlatNote.GFlat]: Note.G,
    [FlatNote.AFlat]: Note.A,
    [FlatNote.BFlat]: Note.B
  };

  flatNotesArray.forEach((note) => {
    const result = getNoteStep(note);
    expect(result).eq(expectedResults[note]);
  });
});

test('getNoteStepsArray should return rotated steps array for all Note values', () => {
  const expectedResults: Record<Note, Note[]> = {
    [Note.C]: [Note.D, Note.E, Note.F, Note.G, Note.A, Note.B, Note.C],
    [Note.CSharp]: [Note.D, Note.E, Note.F, Note.G, Note.A, Note.B, Note.C],
    [Note.D]: [Note.E, Note.F, Note.G, Note.A, Note.B, Note.C, Note.D],
    [Note.DSharp]: [Note.E, Note.F, Note.G, Note.A, Note.B, Note.C, Note.D],
    [Note.E]: [Note.F, Note.G, Note.A, Note.B, Note.C, Note.D, Note.E],
    [Note.F]: [Note.G, Note.A, Note.B, Note.C, Note.D, Note.E, Note.F],
    [Note.FSharp]: [Note.G, Note.A, Note.B, Note.C, Note.D, Note.E, Note.F],
    [Note.G]: [Note.A, Note.B, Note.C, Note.D, Note.E, Note.F, Note.G],
    [Note.GSharp]: [Note.A, Note.B, Note.C, Note.D, Note.E, Note.F, Note.G],
    [Note.A]: [Note.B, Note.C, Note.D, Note.E, Note.F, Note.G, Note.A],
    [Note.ASharp]: [Note.B, Note.C, Note.D, Note.E, Note.F, Note.G, Note.A],
    [Note.B]: [Note.C, Note.D, Note.E, Note.F, Note.G, Note.A, Note.B]
  };

  notesArray.forEach((note) => {
    const result = getNoteStepsArray(note);
    expect(result).toEqual(expectedResults[note]);
  });
});

test('getNoteStepsArray should return rotated steps array for all FlatNote values', () => {
  const expectedResults: Record<FlatNote, Note[]> = {
    [FlatNote.CFlat]: [Note.D, Note.E, Note.F, Note.G, Note.A, Note.B, Note.C],
    [FlatNote.DFlat]: [Note.E, Note.F, Note.G, Note.A, Note.B, Note.C, Note.D],
    [FlatNote.EFlat]: [Note.F, Note.G, Note.A, Note.B, Note.C, Note.D, Note.E],
    [FlatNote.FFlat]: [Note.G, Note.A, Note.B, Note.C, Note.D, Note.E, Note.F],
    [FlatNote.GFlat]: [Note.A, Note.B, Note.C, Note.D, Note.E, Note.F, Note.G],
    [FlatNote.AFlat]: [Note.B, Note.C, Note.D, Note.E, Note.F, Note.G, Note.A],
    [FlatNote.BFlat]: [Note.C, Note.D, Note.E, Note.F, Note.G, Note.A, Note.B]
  };

  flatNotesArray.forEach((note) => {
    const result = getNoteStepsArray(note);
    expect(result).toEqual(expectedResults[note]);
  });
});
