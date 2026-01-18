import type { Note } from '~/music/notes';
import type { Interval } from '~/music/interval';

export type Chord =
  | [Note, Interval, Interval] // Major | Minor | Augmented | Diminished
  | [Note, Interval, Interval, Interval] // Major7 | Dominant7 | Minor7
  | [Note, Interval, Interval, Interval, Interval]; // Major9 | Minor9

export type MajorChord = [Note, Interval.MajorThird, Interval.MinorThird];

export type MinorChord = [Note, Interval.MinorThird, Interval.MajorThird];

export type AugmentedChord = [Note, Interval.MajorThird, Interval.MajorThird];

export type DiminishedChord = [Note, Interval.MinorThird, Interval.MinorThird];

export type Major7Chord = [Note, Interval.MajorThird, Interval.MinorThird, Interval.MajorThird];

export type Minor7Chord = [Note, Interval.MinorThird, Interval.MajorThird, Interval.MinorThird];

export type Major9Chord = [Note, Interval.MajorThird, Interval.MinorThird, Interval.MajorThird, Interval.MinorThird];

export type Minor9Chord = [Note, Interval.MinorThird, Interval.MajorThird, Interval.MinorThird, Interval.MajorThird];
