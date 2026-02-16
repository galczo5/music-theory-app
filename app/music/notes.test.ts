import { expect, test } from 'vitest';
import {
  FlatNote,
  flatNotesArray,
  getNoteStep,
  getNoteStepsArray,
  interval,
  normalizeFlatNote,
  Note,
  notesArray,
  toFlatNote
} from '~/music/notes';

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

test('normalizeFlatNote should return Note as-is when passed a Note', () => {
  expect(normalizeFlatNote(Note.C)).eq(Note.C);
  expect(normalizeFlatNote(Note.CSharp)).eq(Note.CSharp);
  expect(normalizeFlatNote(Note.D)).eq(Note.D);
  expect(normalizeFlatNote(Note.DSharp)).eq(Note.DSharp);
  expect(normalizeFlatNote(Note.E)).eq(Note.E);
  expect(normalizeFlatNote(Note.F)).eq(Note.F);
  expect(normalizeFlatNote(Note.FSharp)).eq(Note.FSharp);
  expect(normalizeFlatNote(Note.G)).eq(Note.G);
  expect(normalizeFlatNote(Note.GSharp)).eq(Note.GSharp);
  expect(normalizeFlatNote(Note.A)).eq(Note.A);
  expect(normalizeFlatNote(Note.ASharp)).eq(Note.ASharp);
  expect(normalizeFlatNote(Note.B)).eq(Note.B);
});

test('normalizeFlatNote should convert all FlatNotes to their equivalent sharp Notes', () => {
  const expectedResults: Record<FlatNote, Note> = {
    [FlatNote.CFlat]: Note.B,
    [FlatNote.DFlat]: Note.CSharp,
    [FlatNote.EFlat]: Note.DSharp,
    [FlatNote.FFlat]: Note.E,
    [FlatNote.GFlat]: Note.FSharp,
    [FlatNote.AFlat]: Note.GSharp,
    [FlatNote.BFlat]: Note.ASharp
  };

  flatNotesArray.forEach((flatNote) => {
    const result = normalizeFlatNote(flatNote);
    expect(result).eq(expectedResults[flatNote]);
  });
});

test('toFlatNote should convert sharp notes to flat equivalents', () => {
  expect(toFlatNote(Note.CSharp)).eq(FlatNote.DFlat);
  expect(toFlatNote(Note.DSharp)).eq(FlatNote.EFlat);
  expect(toFlatNote(Note.FSharp)).eq(FlatNote.GFlat);
  expect(toFlatNote(Note.GSharp)).eq(FlatNote.AFlat);
  expect(toFlatNote(Note.ASharp)).eq(FlatNote.BFlat);
});

test('toFlatNote should convert E to Fb', () => {
  expect(toFlatNote(Note.E)).eq(FlatNote.FFlat);
});

test('toFlatNote should convert B to Cb', () => {
  expect(toFlatNote(Note.B)).eq(FlatNote.CFlat);
});

test('toFlatNote should throw error for natural notes without flat representation', () => {
  expect(() => toFlatNote(Note.C)).toThrow('toFlatNote for [C] not supported');
  expect(() => toFlatNote(Note.D)).toThrow('toFlatNote for [D] not supported');
  expect(() => toFlatNote(Note.F)).toThrow('toFlatNote for [F] not supported');
  expect(() => toFlatNote(Note.G)).toThrow('toFlatNote for [G] not supported');
  expect(() => toFlatNote(Note.A)).toThrow('toFlatNote for [A] not supported');
});
