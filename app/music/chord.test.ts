import { expect, test } from 'vitest';
import { chordFromNotes, chordNotes, compareChords, getChord, type ChordType } from '~/music/chord';
import { Note } from '~/music/notes';

test('compareChords should return true for identical chords (same note, same type)', () => {
  const chordTypes: ChordType[] = [
    'Major',
    'Minor',
    'Augmented',
    'Diminished',
    'Major 7',
    'Minor 7',
    'Major 9',
    'Minor 9'
  ];

  chordTypes.forEach((type) => {
    const chord1 = getChord(Note.C, type);
    const chord2 = getChord(Note.C, type);
    expect(compareChords(chord1, chord2)).toBe(true);
  });
});

test('compareChords should return false for same chord type with different notes', () => {
  const chordTypes: ChordType[] = [
    'Major',
    'Minor',
    'Augmented',
    'Diminished',
    'Major 7',
    'Minor 7',
    'Major 9',
    'Minor 9'
  ];

  chordTypes.forEach((type) => {
    const chord1 = getChord(Note.C, type);
    const chord2 = getChord(Note.D, type);
    expect(compareChords(chord1, chord2)).toBe(false);
  });
});

test('compareChords should return false for same note with different chord types', () => {
  const testCases: [ChordType, ChordType][] = [
    ['Major', 'Minor'],
    ['Minor', 'Augmented'],
    ['Augmented', 'Diminished'],
    ['Diminished', 'Major 7'],
    ['Major 7', 'Minor 7'],
    ['Minor 7', 'Major 9'],
    ['Major 9', 'Minor 9'],
    ['Minor 9', 'Major']
  ];

  testCases.forEach(([type1, type2]) => {
    const chord1 = getChord(Note.C, type1);
    const chord2 = getChord(Note.C, type2);
    expect(compareChords(chord1, chord2)).toBe(false);
  });
});

test('chordFromNotes should correctly create a Major chord', () => {
  const expectedChord = getChord(Note.C, 'Major');
  const notes = chordNotes(expectedChord);
  const resultChord = chordFromNotes(notes);
  expect(compareChords(resultChord, expectedChord)).toBe(true);
});

test('chordFromNotes should correctly create a Minor chord', () => {
  const expectedChord = getChord(Note.D, 'Minor');
  const notes = chordNotes(expectedChord);
  const resultChord = chordFromNotes(notes);
  expect(compareChords(resultChord, expectedChord)).toBe(true);
});

test('chordFromNotes should correctly create an Augmented chord', () => {
  const expectedChord = getChord(Note.E, 'Augmented');
  const notes = chordNotes(expectedChord);
  const resultChord = chordFromNotes(notes);
  expect(compareChords(resultChord, expectedChord)).toBe(true);
});

test('chordFromNotes should correctly create a Diminished chord', () => {
  const expectedChord = getChord(Note.F, 'Diminished');
  const notes = chordNotes(expectedChord);
  const resultChord = chordFromNotes(notes);
  expect(compareChords(resultChord, expectedChord)).toBe(true);
});

test('chordFromNotes should correctly create a Major 7 chord', () => {
  const expectedChord = getChord(Note.G, 'Major 7');
  const notes = chordNotes(expectedChord);
  const resultChord = chordFromNotes(notes);
  expect(compareChords(resultChord, expectedChord)).toBe(true);
});

test('chordFromNotes should correctly create a Minor 7 chord', () => {
  const expectedChord = getChord(Note.A, 'Minor 7');
  const notes = chordNotes(expectedChord);
  const resultChord = chordFromNotes(notes);
  expect(compareChords(resultChord, expectedChord)).toBe(true);
});

test('chordFromNotes should correctly create a Major 9 chord', () => {
  const expectedChord = getChord(Note.B, 'Major 9');
  const notes = chordNotes(expectedChord);
  const resultChord = chordFromNotes(notes);
  expect(compareChords(resultChord, expectedChord)).toBe(true);
});

test('chordFromNotes should correctly create a Minor 9 chord', () => {
  const expectedChord = getChord(Note.C, 'Minor 9');
  const notes = chordNotes(expectedChord);
  const resultChord = chordFromNotes(notes);
  expect(compareChords(resultChord, expectedChord)).toBe(true);
});
