import { transpose } from '~/music/interval';
import {
  FlatNote,
  getNoteStep,
  getNoteStepsArray,
  interval,
  normalizeFlatNote,
  Note,
  notesArray,
  randomNote,
  toFlatNote
} from '~/music/notes';
import type { Scale } from '~/types/scale';
import {
  AEOLIAN,
  DORIAN,
  IONIAN,
  LOCRIAN,
  LYDIAN,
  MIXOLYDIAN,
  PHRYGIAN,
  SCALE_PATTERNS,
  SCALE_TYPES
} from '~/music/scale.const';

export type ScaleType = 'Ionian' | 'Dorian' | 'Phrygian' | 'Lydian' | 'Mixolydian' | 'Aeolian' | 'Locrian';

export function getScale(rootNote: Note | FlatNote, type: ScaleType): Scale {
  switch (type) {
    case 'Ionian':
      return [rootNote, ...IONIAN];
    case 'Dorian':
      return [rootNote, ...DORIAN];
    case 'Phrygian':
      return [rootNote, ...PHRYGIAN];
    case 'Lydian':
      return [rootNote, ...LYDIAN];
    case 'Mixolydian':
      return [rootNote, ...MIXOLYDIAN];
    case 'Aeolian':
      return [rootNote, ...AEOLIAN];
    case 'Locrian':
      return [rootNote, ...LOCRIAN];
  }
}

export function scaleNotes(scale: Scale): Array<Note | FlatNote> {
  const [root, ...intervals] = scale;
  const notes: Array<Note | FlatNote> = [root];

  const steps = getNoteStepsArray(root);

  let current = root;
  for (const i of intervals) {
    const targetStep = steps.shift() as Note;
    const normalizedCurrent = normalizeFlatNote(current);
    current = transpose(normalizedCurrent, i);

    if (getNoteStep(current) === targetStep) {
      notes.push(current);
      continue;
    }

    const semitones = interval(current, targetStep);

    if (Math.min(Math.abs(semitones - notesArray.length), Math.abs(semitones)) > 1) {
      throw new Error('Double flat notes are not implemented!');
    }

    notes.push(toFlatNote(current));
  }

  if (notes.length !== 8) {
    throw new Error('Not enough notes for scale');
  }
  return notes;
}

export function compareScale(scale1: Scale, scale2: Scale): boolean {
  return scale1.length === scale2.length && scale1.every((v, i) => v === scale2[i]);
}

export function scaleName(scale: Scale): string {
  const root = scale[0];
  const intervals = scale.slice(1);
  const pattern = SCALE_PATTERNS.find(
    ({ intervals: p }) => p.length === intervals.length && p.every((v, i) => v === intervals[i])
  );
  return pattern ? `${root} ${pattern.type}` : root;
}

export function randomScale(): Scale {
  const type = SCALE_TYPES[Math.floor(Math.random() * SCALE_TYPES.length)]!;
  return getScale(randomNote(), type);
}
