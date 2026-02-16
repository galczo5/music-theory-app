import { expect, test } from 'vitest';
import { Interval, semitones, transpose } from '~/music/interval';
import { Note } from '~/music/notes';

test('semitones should return correct value for all intervals', () => {
  const expectedSemitones = [
    { interval: Interval.PerfectUnison, semitones: 0 },
    { interval: Interval.MinorSecond, semitones: 1 },
    { interval: Interval.MajorSecond, semitones: 2 },
    { interval: Interval.MinorThird, semitones: 3 },
    { interval: Interval.MajorThird, semitones: 4 },
    { interval: Interval.PerfectFourth, semitones: 5 },
    { interval: Interval.Tritone, semitones: 6 },
    { interval: Interval.PerfectFifth, semitones: 7 },
    { interval: Interval.MinorSixth, semitones: 8 },
    { interval: Interval.MajorSixth, semitones: 9 },
    { interval: Interval.MinorSeventh, semitones: 10 },
    { interval: Interval.MajorSeventh, semitones: 11 },
    { interval: Interval.PerfectOctave, semitones: 12 }
  ];

  for (const { interval, semitones: expected } of expectedSemitones) {
    expect(semitones(interval)).eq(expected);
  }
});

test('transpose should return correct note for all intervals from C', () => {
  const expectedTranspositions = [
    { interval: Interval.PerfectUnison, expectedNote: Note.C },
    { interval: Interval.MinorSecond, expectedNote: Note.CSharp },
    { interval: Interval.MajorSecond, expectedNote: Note.D },
    { interval: Interval.MinorThird, expectedNote: Note.DSharp },
    { interval: Interval.MajorThird, expectedNote: Note.E },
    { interval: Interval.PerfectFourth, expectedNote: Note.F },
    { interval: Interval.Tritone, expectedNote: Note.FSharp },
    { interval: Interval.PerfectFifth, expectedNote: Note.G },
    { interval: Interval.MinorSixth, expectedNote: Note.GSharp },
    { interval: Interval.MajorSixth, expectedNote: Note.A },
    { interval: Interval.MinorSeventh, expectedNote: Note.ASharp },
    { interval: Interval.MajorSeventh, expectedNote: Note.B },
    { interval: Interval.PerfectOctave, expectedNote: Note.C }
  ];

  for (const { interval, expectedNote } of expectedTranspositions) {
    const result = transpose(Note.C, interval);
    expect(result).eq(expectedNote);
  }
});
