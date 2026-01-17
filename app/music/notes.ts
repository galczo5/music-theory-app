export enum Note {
  C = 'C',
  CSharp = 'C#',
  D = 'D',
  DSharp = 'D#',
  E = 'E',
  F = 'F',
  FSharp = 'F#',
  G = 'G',
  GSharp = 'G#',
  A = 'A',
  ASharp = 'A#',
  B = 'B'
}

export const notesArray: Note[] = Object.values(Note);

export function interval(note1: Note, note2: Note): number {
  return Math.abs(notesArray.indexOf(note1) - notesArray.indexOf(note2));
}
