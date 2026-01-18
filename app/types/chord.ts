import type { Note } from '~/music/notes';
import type { Interval } from '~/music/interval';

export type Chord = [Note, Interval, Interval] | [Note, Interval, Interval, Interval];

export type MajorChord = [Note, Interval.MajorThird, Interval.MinorThird];

export type MinorChord = [Note, Interval.MinorThird, Interval.MajorThird];

export type AugmentedChord = [Note, Interval.MajorThird, Interval.MajorThird];

export type DiminishedChord = [Note, Interval.MinorThird, Interval.MinorThird];
