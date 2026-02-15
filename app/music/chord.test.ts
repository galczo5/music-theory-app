import { expect, test } from 'vitest';
import { compareChords, getChord, type ChordType } from '~/music/chord';
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
