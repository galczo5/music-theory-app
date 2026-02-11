import { describe, expect, it } from 'vitest';
import { Note } from '~/music/notes';
import { getScale, normalizedScaleNotes, type ScaleType } from '~/music/scale';

describe('normalizedScaleNotes', () => {
  const testCases = [
    {
      root: Note.C,
      type: 'Ionian' as ScaleType,
      expected: ['C', 'D', 'E', 'F', 'G', 'A', 'B']
    },
    {
      root: Note.D,
      type: 'Dorian' as ScaleType,
      expected: ['D', 'E', 'F', 'G', 'A', 'B', 'C']
    },
    {
      root: Note.E,
      type: 'Phrygian' as ScaleType,
      expected: ['E', 'F', 'G', 'A', 'B', 'C', 'D']
    },
    {
      root: Note.F,
      type: 'Lydian' as ScaleType,
      expected: ['F', 'G', 'A', 'B', 'C', 'D', 'E']
    },
    {
      root: Note.G,
      type: 'Mixolydian' as ScaleType,
      expected: ['G', 'A', 'B', 'C', 'D', 'E', 'F']
    },
    {
      root: Note.A,
      type: 'Aeolian' as ScaleType,
      expected: ['A', 'B', 'C', 'D', 'E', 'F', 'G']
    },
    {
      root: Note.B,
      type: 'Locrian' as ScaleType,
      expected: ['B', 'C', 'D', 'E', 'F', 'G', 'A']
    }
  ];

  testCases.forEach(({ root, type, expected }) => {
    it(`should return correct notes for ${root} ${type}`, () => {
      const scale = getScale(root, type);
      const result = normalizedScaleNotes(scale);
      result.pop();
      expect(result).toEqual(expected);
    });
  });
});
