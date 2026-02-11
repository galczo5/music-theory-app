import { describe, expect, it } from 'vitest';
import { getScale, scaleNotes, type ScaleType } from '~/music/scale';
import { FlatNote, Note } from '~/music/notes';

const testCases = [
  // C Major Modes
  { root: Note.C, type: 'Ionian', expected: ['C', 'D', 'E', 'F', 'G', 'A', 'B'] },
  { root: Note.D, type: 'Dorian', expected: ['D', 'E', 'F', 'G', 'A', 'B', 'C'] },
  { root: Note.E, type: 'Phrygian', expected: ['E', 'F', 'G', 'A', 'B', 'C', 'D'] },
  { root: Note.F, type: 'Lydian', expected: ['F', 'G', 'A', 'B', 'C', 'D', 'E'] },
  { root: Note.G, type: 'Mixolydian', expected: ['G', 'A', 'B', 'C', 'D', 'E', 'F'] },
  { root: Note.A, type: 'Aeolian', expected: ['A', 'B', 'C', 'D', 'E', 'F', 'G'] },
  { root: Note.B, type: 'Locrian', expected: ['B', 'C', 'D', 'E', 'F', 'G', 'A'] },

  // G Major Modes
  { root: Note.G, type: 'Ionian', expected: ['G', 'A', 'B', 'C', 'D', 'E', 'F#'] },
  { root: Note.A, type: 'Dorian', expected: ['A', 'B', 'C', 'D', 'E', 'F#', 'G'] },
  { root: Note.B, type: 'Phrygian', expected: ['B', 'C', 'D', 'E', 'F#', 'G', 'A'] },
  { root: Note.C, type: 'Lydian', expected: ['C', 'D', 'E', 'F#', 'G', 'A', 'B'] },
  { root: Note.D, type: 'Mixolydian', expected: ['D', 'E', 'F#', 'G', 'A', 'B', 'C'] },
  { root: Note.E, type: 'Aeolian', expected: ['E', 'F#', 'G', 'A', 'B', 'C', 'D'] },
  { root: Note.FSharp, type: 'Locrian', expected: ['F#', 'G', 'A', 'B', 'C', 'D', 'E'] },

  // D Major Modes
  { root: Note.D, type: 'Ionian', expected: ['D', 'E', 'F#', 'G', 'A', 'B', 'C#'] },
  { root: Note.E, type: 'Dorian', expected: ['E', 'F#', 'G', 'A', 'B', 'C#', 'D'] },
  { root: Note.FSharp, type: 'Phrygian', expected: ['F#', 'G', 'A', 'B', 'C#', 'D', 'E'] },
  { root: Note.G, type: 'Lydian', expected: ['G', 'A', 'B', 'C#', 'D', 'E', 'F#'] },
  { root: Note.A, type: 'Mixolydian', expected: ['A', 'B', 'C#', 'D', 'E', 'F#', 'G'] },
  { root: Note.B, type: 'Aeolian', expected: ['B', 'C#', 'D', 'E', 'F#', 'G', 'A'] },
  { root: Note.CSharp, type: 'Locrian', expected: ['C#', 'D', 'E', 'F#', 'G', 'A', 'B'] },

  // F Major Modes
  { root: Note.F, type: 'Ionian', expected: ['F', 'G', 'A', 'Bb', 'C', 'D', 'E'] },
  { root: Note.G, type: 'Dorian', expected: ['G', 'A', 'Bb', 'C', 'D', 'E', 'F'] },
  { root: Note.A, type: 'Phrygian', expected: ['A', 'Bb', 'C', 'D', 'E', 'F', 'G'] },
  { root: FlatNote.BFlat, type: 'Lydian', expected: ['Bb', 'C', 'D', 'E', 'F', 'G', 'A'] },
  { root: Note.C, type: 'Mixolydian', expected: ['C', 'D', 'E', 'F', 'G', 'A', 'Bb'] },
  { root: Note.D, type: 'Aeolian', expected: ['D', 'E', 'F', 'G', 'A', 'Bb', 'C'] },
  { root: Note.E, type: 'Locrian', expected: ['E', 'F', 'G', 'A', 'Bb', 'C', 'D'] },

  // Bb Major Modes
  { root: FlatNote.BFlat, type: 'Ionian', expected: ['Bb', 'C', 'D', 'Eb', 'F', 'G', 'A'] },
  { root: Note.C, type: 'Dorian', expected: ['C', 'D', 'Eb', 'F', 'G', 'A', 'Bb'] },
  { root: Note.D, type: 'Phrygian', expected: ['D', 'Eb', 'F', 'G', 'A', 'Bb', 'C'] },
  { root: FlatNote.EFlat, type: 'Lydian', expected: ['Eb', 'F', 'G', 'A', 'Bb', 'C', 'D'] },
  { root: Note.F, type: 'Mixolydian', expected: ['F', 'G', 'A', 'Bb', 'C', 'D', 'Eb'] },
  { root: Note.G, type: 'Aeolian', expected: ['G', 'A', 'Bb', 'C', 'D', 'Eb', 'F'] },
  { root: Note.A, type: 'Locrian', expected: ['A', 'Bb', 'C', 'D', 'Eb', 'F', 'G'] },

  // Eb Major Modes
  { root: FlatNote.EFlat, type: 'Ionian', expected: ['Eb', 'F', 'G', 'Ab', 'Bb', 'C', 'D'] },
  { root: Note.F, type: 'Dorian', expected: ['F', 'G', 'Ab', 'Bb', 'C', 'D', 'Eb'] },
  { root: Note.G, type: 'Phrygian', expected: ['G', 'Ab', 'Bb', 'C', 'D', 'Eb', 'F'] },
  { root: FlatNote.AFlat, type: 'Lydian', expected: ['Ab', 'Bb', 'C', 'D', 'Eb', 'F', 'G'] },
  { root: FlatNote.BFlat, type: 'Mixolydian', expected: ['Bb', 'C', 'D', 'Eb', 'F', 'G', 'Ab'] },
  { root: Note.C, type: 'Aeolian', expected: ['C', 'D', 'Eb', 'F', 'G', 'Ab', 'Bb'] },
  { root: Note.D, type: 'Locrian', expected: ['D', 'Eb', 'F', 'G', 'Ab', 'Bb', 'C'] },

  // Ab Major Modes
  { root: FlatNote.AFlat, type: 'Ionian', expected: ['Ab', 'Bb', 'C', 'Db', 'Eb', 'F', 'G'] },
  { root: FlatNote.BFlat, type: 'Dorian', expected: ['Bb', 'C', 'Db', 'Eb', 'F', 'G', 'Ab'] },
  { root: Note.C, type: 'Phrygian', expected: ['C', 'Db', 'Eb', 'F', 'G', 'Ab', 'Bb'] },
  { root: FlatNote.DFlat, type: 'Lydian', expected: ['Db', 'Eb', 'F', 'G', 'Ab', 'Bb', 'C'] },
  { root: FlatNote.EFlat, type: 'Mixolydian', expected: ['Eb', 'F', 'G', 'Ab', 'Bb', 'C', 'Db'] },
  { root: Note.F, type: 'Aeolian', expected: ['F', 'G', 'Ab', 'Bb', 'C', 'Db', 'Eb'] },
  { root: Note.G, type: 'Locrian', expected: ['G', 'Ab', 'Bb', 'C', 'Db', 'Eb', 'F'] },

  // Db Major Modes
  { root: FlatNote.DFlat, type: 'Ionian', expected: ['Db', 'Eb', 'F', 'Gb', 'Ab', 'Bb', 'C'] },
  { root: FlatNote.EFlat, type: 'Dorian', expected: ['Eb', 'F', 'Gb', 'Ab', 'Bb', 'C', 'Db'] },
  { root: Note.F, type: 'Phrygian', expected: ['F', 'Gb', 'Ab', 'Bb', 'C', 'Db', 'Eb'] },
  { root: FlatNote.GFlat, type: 'Lydian', expected: ['Gb', 'Ab', 'Bb', 'C', 'Db', 'Eb', 'F'] },
  { root: FlatNote.AFlat, type: 'Mixolydian', expected: ['Ab', 'Bb', 'C', 'Db', 'Eb', 'F', 'Gb'] },
  { root: FlatNote.BFlat, type: 'Aeolian', expected: ['Bb', 'C', 'Db', 'Eb', 'F', 'Gb', 'Ab'] },
  { root: Note.C, type: 'Locrian', expected: ['C', 'Db', 'Eb', 'F', 'Gb', 'Ab', 'Bb'] },

  // Gb Major Modes
  { root: FlatNote.GFlat, type: 'Ionian', expected: ['Gb', 'Ab', 'Bb', 'Cb', 'Db', 'Eb', 'F'] },
  { root: FlatNote.AFlat, type: 'Dorian', expected: ['Ab', 'Bb', 'Cb', 'Db', 'Eb', 'F', 'Gb'] },
  { root: FlatNote.BFlat, type: 'Phrygian', expected: ['Bb', 'Cb', 'Db', 'Eb', 'F', 'Gb', 'Ab'] },
  { root: FlatNote.CFlat, type: 'Lydian', expected: ['Cb', 'Db', 'Eb', 'F', 'Gb', 'Ab', 'Bb'] },
  { root: FlatNote.DFlat, type: 'Mixolydian', expected: ['Db', 'Eb', 'F', 'Gb', 'Ab', 'Bb', 'Cb'] },
  { root: FlatNote.EFlat, type: 'Aeolian', expected: ['Eb', 'F', 'Gb', 'Ab', 'Bb', 'Cb', 'Db'] },
  { root: Note.F, type: 'Locrian', expected: ['F', 'Gb', 'Ab', 'Bb', 'Cb', 'Db', 'Eb'] },

  // Cb Major Modes
  { root: FlatNote.CFlat, type: 'Ionian', expected: ['Cb', 'Db', 'Eb', 'Fb', 'Gb', 'Ab', 'Bb'] },
  { root: FlatNote.DFlat, type: 'Dorian', expected: ['Db', 'Eb', 'Fb', 'Gb', 'Ab', 'Bb', 'Cb'] },
  { root: FlatNote.EFlat, type: 'Phrygian', expected: ['Eb', 'Fb', 'Gb', 'Ab', 'Bb', 'Cb', 'Db'] },
  { root: FlatNote.FFlat, type: 'Lydian', expected: ['Fb', 'Gb', 'Ab', 'Bb', 'Cb', 'Db', 'Eb'] },
  { root: FlatNote.GFlat, type: 'Mixolydian', expected: ['Gb', 'Ab', 'Bb', 'Cb', 'Db', 'Eb', 'Fb'] },
  { root: FlatNote.AFlat, type: 'Aeolian', expected: ['Ab', 'Bb', 'Cb', 'Db', 'Eb', 'Fb', 'Gb'] },
  { root: FlatNote.BFlat, type: 'Locrian', expected: ['Bb', 'Cb', 'Db', 'Eb', 'Fb', 'Gb', 'Ab'] }
];

describe('normalizedScaleNotes', () => {
  testCases.forEach(({ root, type, expected }) => {
    it(`should return correct notes for ${root} ${type}`, () => {
      const scale = getScale(root, type as ScaleType);
      const result = scaleNotes(scale);

      result.pop();
      expect(result).toEqual(expected);
    });
  });
});
