import type { Note } from '~/music/notes';
import type { Interval } from '~/music/interval';

export type Chord = [Note, Interval, Interval] | [Note, Interval, Interval, Interval];
