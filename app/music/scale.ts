import type { Note } from '~/music/notes';
import type { Scale } from '~/types/scale';

export type ScaleType = 'Ionian' | 'Dorian' | 'Phrygian' | 'Lydian' | 'Mixolydian' | 'Aeolian' | 'Locrian';

export function getScale(rootNote: Note, type: ScaleType): Scale {
  // TODO: Use switch case to generate Scale by given type
}
