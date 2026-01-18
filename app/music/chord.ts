import { Interval, transpose } from '~/music/interval';
import type { Chord } from '~/types/chord';
import type { Note } from '~/music/notes';

export function chordName(chord: Chord): string {
  const note = chord[0];
  let type = '';

  if (chord.length === 3) {
    if (chord[1] === Interval.MajorThird && chord[2] === Interval.MinorThird) {
      type = 'Major';
    }

    if (chord[1] === Interval.MinorThird && chord[2] === Interval.MajorThird) {
      type = 'Minor';
    }

    if (chord[1] === Interval.MajorThird && chord[2] === Interval.MajorThird) {
      type = 'Augmented';
    }

    if (chord[1] === Interval.MinorThird && chord[2] === Interval.MinorThird) {
      type = 'Diminished';
    }
  }

  if (chord.length === 4) {
    if (chord[1] === Interval.MajorThird && chord[2] === Interval.MinorThird && chord[3] === Interval.MajorThird) {
      type = 'Major 7';
    }

    if (chord[1] === Interval.MinorThird && chord[2] === Interval.MajorThird && chord[3] === Interval.MinorThird) {
      type = 'Minor 7';
    }
  }

  if (chord.length === 5) {
    if (
      chord[1] === Interval.MajorThird &&
      chord[2] === Interval.MinorThird &&
      chord[3] === Interval.MajorThird &&
      chord[4] === Interval.MinorThird
    ) {
      type = 'Major 9';
    }

    if (
      chord[1] === Interval.MinorThird &&
      chord[2] === Interval.MajorThird &&
      chord[3] === Interval.MinorThird &&
      chord[4] === Interval.MajorThird
    ) {
      type = 'Minor 9';
    }
  }

  return `${note} ${type}`;
}

export function chordNotes(chord: Chord): Note[] {
  const result: Note[] = [];

  const rootNote = chord[0];
  result.push(rootNote);

  const note2 = transpose(rootNote, chord[1]);
  result.push(note2);

  const note3 = transpose(note2, chord[2]);
  result.push(note3);

  if (chord.length === 4) {
    const note3 = transpose(note2, chord[3]);
    result.push(note3);
  }

  return result;
}
