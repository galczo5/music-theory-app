import { FlatNote, normalizeFlatNote, type Note, notesArray } from '~/music/notes';

export enum Interval {
  PerfectUnison = 'Perfect unison',
  MinorSecond = 'Minor second',
  MajorSecond = 'Major second',
  MinorThird = 'Minor third',
  MajorThird = 'Major third',
  PerfectFourth = 'Perfect fourth',
  Tritone = 'Tritone',
  PerfectFifth = 'Perfect fifth',
  MinorSixth = 'Minor sixth',
  MajorSixth = 'Major sixth',
  MinorSeventh = 'Minor seventh',
  MajorSeventh = 'Major seventh',
  PerfectOctave = 'Perfect octave'
}

export const intervalArray = Object.values(Interval);

export function semitones(interval: Interval): number {
  return Object.values(Interval).indexOf(interval);
}

export function randomInterval(): Interval {
  const length = intervalArray.length;
  const random = Math.floor(Math.random() * length);
  return intervalArray.at(random) || Interval.PerfectOctave;
}

export function transpose(rootNote: Note | FlatNote, interval: Interval): Note {
  const normalizedNote = normalizeFlatNote(rootNote);

  if (interval === Interval.PerfectOctave) {
    return normalizedNote;
  }

  let copy = [...notesArray];

  while (copy.at(0) !== normalizedNote) {
    const [first, ...rest] = copy;
    copy = [...rest, first];
  }

  const result = copy.at(semitones(interval));

  if (!result) {
    throw new Error('Not enough interval found.');
  }

  return result;
}
