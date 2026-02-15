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

export enum FlatNote {
  CFlat = 'Cb',
  DFlat = 'Db',
  EFlat = 'Eb',
  FFlat = 'Fb',
  GFlat = 'Gb',
  AFlat = 'Ab',
  BFlat = 'Bb'
}

export const STEPS: ReadonlyArray<Note> = [Note.C, Note.D, Note.E, Note.F, Note.G, Note.A, Note.B];

export function isFlatNote(note: FlatNote | Note): note is FlatNote {
  return Object.values(FlatNote).includes(note as FlatNote);
}

export function toFlatNote(note: Note): FlatNote {
  switch (note) {
    case Note.DSharp:
      return FlatNote.EFlat;
    case Note.E:
      return FlatNote.FFlat;
    case Note.FSharp:
      return FlatNote.GFlat;
    case Note.GSharp:
      return FlatNote.AFlat;
    case Note.ASharp:
      return FlatNote.BFlat;
    case Note.B:
      return FlatNote.CFlat;
    case Note.CSharp:
      return FlatNote.DFlat;

    default:
      throw new Error(`toFlatNote for [${note}] not supported`);
  }
}

export function normalizeFlatNote(note: FlatNote | Note): Note {
  if (!isFlatNote(note)) {
    return note as Note;
  }

  switch (note) {
    case FlatNote.CFlat:
      return Note.B;
    case FlatNote.DFlat:
      return Note.CSharp;
    case FlatNote.EFlat:
      return Note.DSharp;
    case FlatNote.FFlat:
      return Note.E;
    case FlatNote.GFlat:
      return Note.FSharp;
    case FlatNote.AFlat:
      return Note.GSharp;
    case FlatNote.BFlat:
      return Note.ASharp;
  }
}

export const notesArray: Note[] = Object.values(Note);
export const flatNotesArray: FlatNote[] = Object.values(FlatNote);

export function interval(rootNote: Note | FlatNote, note2: Note | FlatNote): number {
  const normalizedRootNote = normalizeFlatNote(rootNote);
  const normalizedNote2 = normalizeFlatNote(note2);
  let copy = [...notesArray];

  while (copy.at(0) !== rootNote) {
    const [first, ...rest] = copy;
    copy = [...rest, first];
  }

  return Math.abs(copy.indexOf(normalizedNote2) - copy.indexOf(normalizedRootNote));
}

export function randomNote(): Note {
  return notesArray[Math.floor(Math.random() * notesArray.length)];
}

export function notesMatch(selected: Note[], expected: Note[]): boolean {
  return selected.length === expected.length && selected.every((n, i) => n === expected[i]);
}

function deSharpNote(note: Note): Note {
  switch (note) {
    case Note.CSharp:
      return Note.C;
    case Note.DSharp:
      return Note.D;
    case Note.FSharp:
      return Note.F;
    case Note.GSharp:
      return Note.G;
    case Note.ASharp:
      return Note.A;
    default:
      return note;
  }
}

function deFlatNote(note: FlatNote): Note {
  switch (note) {
    case FlatNote.CFlat:
      return Note.C;
    case FlatNote.DFlat:
      return Note.D;
    case FlatNote.EFlat:
      return Note.E;
    case FlatNote.FFlat:
      return Note.F;
    case FlatNote.GFlat:
      return Note.G;
    case FlatNote.AFlat:
      return Note.A;
    case FlatNote.BFlat:
      return Note.B;
  }
}

export function getNoteStep(note: FlatNote | Note): Note {
  if (Object.values(Note).includes(note as Note)) {
    return deSharpNote(note as Note);
  } else {
    return deFlatNote(note as FlatNote);
  }
}

export function getNoteStepsArray(note: FlatNote | Note): Note[] {
  const steps = [...STEPS];
  const offset = steps.indexOf(getNoteStep(note)) + 1;

  for (let i = 0; i < offset; i++) {
    const first = steps.shift() as Note;
    steps.push(first);
  }
  return steps;
}
