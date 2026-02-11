import type { Interval } from '~/music/interval';
import { FlatNote, type Note } from '~/music/notes';

export type IonianScale = [
  Interval.MajorSecond,
  Interval.MajorSecond,
  Interval.MinorSecond,
  Interval.MajorSecond,
  Interval.MajorSecond,
  Interval.MajorSecond,
  Interval.MinorSecond
];

export type DorianScale = [
  Interval.MajorSecond,
  Interval.MinorSecond,
  Interval.MajorSecond,
  Interval.MajorSecond,
  Interval.MajorSecond,
  Interval.MinorSecond,
  Interval.MajorSecond
];

export type PhrygianScale = [
  Interval.MinorSecond,
  Interval.MajorSecond,
  Interval.MajorSecond,
  Interval.MajorSecond,
  Interval.MinorSecond,
  Interval.MajorSecond,
  Interval.MajorSecond
];

export type LydianScale = [
  Interval.MajorSecond,
  Interval.MajorSecond,
  Interval.MajorSecond,
  Interval.MinorSecond,
  Interval.MajorSecond,
  Interval.MajorSecond,
  Interval.MinorSecond
];

export type MixolydianScale = [
  Interval.MajorSecond,
  Interval.MajorSecond,
  Interval.MinorSecond,
  Interval.MajorSecond,
  Interval.MajorSecond,
  Interval.MinorSecond,
  Interval.MajorSecond
];

export type AeolianScale = [
  Interval.MajorSecond,
  Interval.MinorSecond,
  Interval.MajorSecond,
  Interval.MajorSecond,
  Interval.MinorSecond,
  Interval.MajorSecond,
  Interval.MajorSecond
];

export type LocrianScale = [
  Interval.MinorSecond,
  Interval.MajorSecond,
  Interval.MajorSecond,
  Interval.MinorSecond,
  Interval.MajorSecond,
  Interval.MajorSecond,
  Interval.MajorSecond
];

export type ScaleIntervals =
  | IonianScale
  | DorianScale
  | PhrygianScale
  | LydianScale
  | MixolydianScale
  | AeolianScale
  | LocrianScale;

export type NormalizedScale = [Note, ...ScaleIntervals];
export type Scale = [Note | FlatNote, ...ScaleIntervals];
