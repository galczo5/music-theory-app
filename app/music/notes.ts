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

export function interval(rootNote: Note, note2: Note): number {
  let copy = [...notesArray];

  while (copy.at(0) !== rootNote) {
    const [first, ...rest] = copy;
    copy = [...rest, first];
  }

  return Math.abs(copy.indexOf(note2) - copy.indexOf(rootNote));
}

export function randomNote(): Note {
  return notesArray[Math.floor(Math.random() * notesArray.length)];
}
