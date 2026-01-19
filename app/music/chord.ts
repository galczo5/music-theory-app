import { Interval, intervalArray, transpose } from '~/music/interval';
import type {
  AugmentedChord,
  Chord,
  DiminishedChord,
  Major7Chord,
  Major9Chord,
  MajorChord,
  Minor7Chord,
  Minor9Chord,
  MinorChord
} from '~/types/chord';
import { interval, type Note } from '~/music/notes';

export type ChordType = 'Major' | 'Minor' | 'Augmented' | 'Diminished' | 'Major 7' | 'Minor 7' | 'Major 9' | 'Minor 9';

export function chordName(chord: Chord, format?: 'note' | 'type' | undefined): string {
  const note = chord[0];
  let type: ChordType | undefined;

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

  if (format === 'type') return type || '';
  if (format === 'note') return note;

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

  if (chord.length === 4 || chord.length === 5) {
    const note4 = transpose(note3, chord[3]);
    result.push(note4);

    if (chord.length === 5) {
      const note5 = transpose(note3, chord[4]);
      result.push(note5);
    }
  }

  return result;
}

export function chordFromNotes(notes: Note[]): Chord {
  if (notes.length < 3) {
    throw new Error('Not a chord');
  }

  const interval1 = interval(notes[0], notes[1]);
  const interval2 = interval(notes[1], notes[2]);

  if (notes.length === 5) {
    const interval3 = interval(notes[2], notes[3]);
    const interval4 = interval(notes[3], notes[4]);
    return [
      notes[0],
      intervalArray[interval1],
      intervalArray[interval2],
      intervalArray[interval3],
      intervalArray[interval4]
    ];
  }

  if (notes.length === 4) {
    const interval3 = interval(notes[2], notes[3]);
    return [notes[0], intervalArray[interval1], intervalArray[interval2], intervalArray[interval3]];
  }

  return [notes[0], intervalArray[interval1], intervalArray[interval2]];
}

export function getChord(note: Note, type: ChordType): Chord {
  switch (type) {
    case 'Major':
      return [note, Interval.MajorThird, Interval.MinorThird] as MajorChord;
    case 'Minor':
      return [note, Interval.MinorThird, Interval.MajorThird] as MinorChord;
    case 'Augmented':
      return [note, Interval.MajorThird, Interval.MajorThird] as AugmentedChord;
    case 'Diminished':
      return [note, Interval.MinorThird, Interval.MinorThird] as DiminishedChord;
    case 'Major 7':
      return [note, Interval.MajorThird, Interval.MinorThird, Interval.MajorThird] as Major7Chord;
    case 'Minor 7':
      return [note, Interval.MinorThird, Interval.MajorThird, Interval.MinorThird] as Minor7Chord;
    case 'Major 9':
      return [note, Interval.MajorThird, Interval.MinorThird, Interval.MajorThird, Interval.MinorThird] as Major9Chord;
    case 'Minor 9':
      return [note, Interval.MinorThird, Interval.MajorThird, Interval.MinorThird, Interval.MajorThird] as Minor9Chord;
  }
}

export function compareChords(chord1: Chord, chord2: Chord): boolean {
  if (chord1.length !== chord2.length) {
    return false;
  }

  for (let i = 0; i < chord1.length; i++) {
    if (chord1.at(i) !== chord2.at(i)) {
      return false;
    }
  }

  return true;
}
