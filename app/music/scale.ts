import { Interval } from '~/music/interval';
import type { Note } from '~/music/notes';
import type {
  AeolianScale,
  DorianScale,
  IonianScale,
  LocrianScale,
  LydianScale,
  MixolydianScale,
  PhrygianScale,
  Scale
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
