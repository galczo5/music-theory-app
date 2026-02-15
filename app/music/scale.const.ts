import { Interval } from '~/music/interval';
import type {
  AeolianScale,
  DorianScale,
  IonianScale,
  LocrianScale,
  LydianScale,
  MixolydianScale,
  PhrygianScale,
  ScaleIntervals
} from '~/types/scale';
import type { ScaleType } from '~/music/scale';

export const SCALE_TYPES: ScaleType[] = ['Ionian', 'Dorian', 'Phrygian', 'Lydian', 'Mixolydian', 'Aeolian', 'Locrian'];

export const IONIAN: IonianScale = [
  Interval.MajorSecond,
  Interval.MajorSecond,
  Interval.MinorSecond,
  Interval.MajorSecond,
  Interval.MajorSecond,
  Interval.MajorSecond,
  Interval.MinorSecond
];

export const DORIAN: DorianScale = [
  Interval.MajorSecond,
  Interval.MinorSecond,
  Interval.MajorSecond,
  Interval.MajorSecond,
  Interval.MajorSecond,
  Interval.MinorSecond,
  Interval.MajorSecond
];

export const PHRYGIAN: PhrygianScale = [
  Interval.MinorSecond,
  Interval.MajorSecond,
  Interval.MajorSecond,
  Interval.MajorSecond,
  Interval.MinorSecond,
  Interval.MajorSecond,
  Interval.MajorSecond
];

export const LYDIAN: LydianScale = [
  Interval.MajorSecond,
  Interval.MajorSecond,
  Interval.MajorSecond,
  Interval.MinorSecond,
  Interval.MajorSecond,
  Interval.MajorSecond,
  Interval.MinorSecond
];

export const MIXOLYDIAN: MixolydianScale = [
  Interval.MajorSecond,
  Interval.MajorSecond,
  Interval.MinorSecond,
  Interval.MajorSecond,
  Interval.MajorSecond,
  Interval.MinorSecond,
  Interval.MajorSecond
];

export const AEOLIAN: AeolianScale = [
  Interval.MajorSecond,
  Interval.MinorSecond,
  Interval.MajorSecond,
  Interval.MajorSecond,
  Interval.MinorSecond,
  Interval.MajorSecond,
  Interval.MajorSecond
];

export const LOCRIAN: LocrianScale = [
  Interval.MinorSecond,
  Interval.MajorSecond,
  Interval.MajorSecond,
  Interval.MinorSecond,
  Interval.MajorSecond,
  Interval.MajorSecond,
  Interval.MajorSecond
];

export const SCALE_PATTERNS: { type: ScaleType; intervals: ScaleIntervals }[] = [
  { type: 'Ionian', intervals: IONIAN },
  { type: 'Dorian', intervals: DORIAN },
  { type: 'Phrygian', intervals: PHRYGIAN },
  { type: 'Lydian', intervals: LYDIAN },
  { type: 'Mixolydian', intervals: MIXOLYDIAN },
  { type: 'Aeolian', intervals: AEOLIAN },
  { type: 'Locrian', intervals: LOCRIAN }
];
