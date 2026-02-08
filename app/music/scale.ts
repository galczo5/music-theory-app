import { Interval, transpose } from '~/music/interval';
import type { Note } from '~/music/notes';
import type {
  AeolianScale,
  DorianScale,
  IonianScale,
  LocrianScale,
  LydianScale,
  MixolydianScale,
  PhrygianScale,
  Scale,
  ScaleIntervals
} from '~/types/scale';

export type ScaleType = 'Ionian' | 'Dorian' | 'Phrygian' | 'Lydian' | 'Mixolydian' | 'Aeolian' | 'Locrian';

const IONIAN: IonianScale = [
  Interval.MajorSecond,
  Interval.MajorSecond,
  Interval.MinorSecond,
  Interval.MajorSecond,
  Interval.MajorSecond,
  Interval.MajorSecond,
  Interval.MinorSecond
];

const DORIAN: DorianScale = [
  Interval.MajorSecond,
  Interval.MinorSecond,
  Interval.MajorSecond,
  Interval.MajorSecond,
  Interval.MajorSecond,
  Interval.MinorSecond,
  Interval.MajorSecond
];

const PHRYGIAN: PhrygianScale = [
  Interval.MinorSecond,
  Interval.MajorSecond,
  Interval.MajorSecond,
  Interval.MajorSecond,
  Interval.MinorSecond,
  Interval.MajorSecond,
  Interval.MajorSecond
];

const LYDIAN: LydianScale = [
  Interval.MajorSecond,
  Interval.MajorSecond,
  Interval.MajorSecond,
  Interval.MinorSecond,
  Interval.MajorSecond,
  Interval.MajorSecond,
  Interval.MinorSecond
];

const MIXOLYDIAN: MixolydianScale = [
  Interval.MajorSecond,
  Interval.MajorSecond,
  Interval.MinorSecond,
  Interval.MajorSecond,
  Interval.MajorSecond,
  Interval.MinorSecond,
  Interval.MajorSecond
];

const AEOLIAN: AeolianScale = [
  Interval.MajorSecond,
  Interval.MinorSecond,
  Interval.MajorSecond,
  Interval.MajorSecond,
  Interval.MinorSecond,
  Interval.MajorSecond,
  Interval.MajorSecond
];

const LOCRIAN: LocrianScale = [
  Interval.MinorSecond,
  Interval.MajorSecond,
  Interval.MajorSecond,
  Interval.MinorSecond,
  Interval.MajorSecond,
  Interval.MajorSecond,
  Interval.MajorSecond
];

const SCALE_PATTERNS: { type: ScaleType; intervals: ScaleIntervals }[] = [
  { type: 'Ionian', intervals: IONIAN },
  { type: 'Dorian', intervals: DORIAN },
  { type: 'Phrygian', intervals: PHRYGIAN },
  { type: 'Lydian', intervals: LYDIAN },
  { type: 'Mixolydian', intervals: MIXOLYDIAN },
  { type: 'Aeolian', intervals: AEOLIAN },
  { type: 'Locrian', intervals: LOCRIAN }
];

export function getScale(rootNote: Note, type: ScaleType): Scale {
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

export function scaleNotes(scale: Scale): Note[] {
  const [root, ...intervals] = scale;
  const notes: Note[] = [root];
  let current = root;
  for (const interval of intervals) {
    current = transpose(current, interval);
    notes.push(current);
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
