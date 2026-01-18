import { createContext, useContext } from 'react';
import { PolySynth, Synth } from 'tone';
import { Note, notesArray } from '~/music/notes';
import { type Interval, semitones } from '~/music/interval';
import type { Chord } from '~/types/chord';

function initSynth() {
  return new PolySynth(Synth, {
    oscillator: {
      partials: [0, 2, 3, 4]
    }
  }).toDestination();
}

const MIDI_VALUES: Record<Note, number> = {
  [Note.C]: 60,
  [Note.CSharp]: 61,
  [Note.D]: 62,
  [Note.DSharp]: 63,
  [Note.E]: 64,
  [Note.F]: 65,
  [Note.FSharp]: 66,
  [Note.G]: 67,
  [Note.GSharp]: 68,
  [Note.A]: 69,
  [Note.ASharp]: 70,
  [Note.B]: 71
};

function midiNoteName(n: number): string {
  const octaveNumber = Math.floor(n / 12);
  const octave = octaveNumber - 1;
  const note = notesArray[n % 12] || '';

  return note.includes('#') ? `${note[0]}#${octave}` : `${note[0]}${octave}`;
}

const MIDI_NOTE_NAMES: Record<number, string> = Array.from({ length: 255 }, (_, i) => i)
  .map((value) => [value, midiNoteName(value)])
  .reduce((previousValue, currentValue) => {
    return { ...previousValue, [currentValue[0]]: [currentValue[1]] };
  }, {});

const NOTE_TIME_IN_SECONDS = 1;

class Player {
  private static synth1: PolySynth | null;
  private static synth2: PolySynth | null;
  private static synth3: PolySynth | null;
  private static synth4: PolySynth | null;
  private static synth5: PolySynth | null;

  constructor() {
    if (!Player.synth1) Player.synth1 = initSynth();
    if (!Player.synth2) Player.synth2 = initSynth();
    if (!Player.synth3) Player.synth3 = initSynth();
    if (!Player.synth4) Player.synth4 = initSynth();
    if (!Player.synth5) Player.synth5 = initSynth();
  }

  async playInterval(note: Note, interval: Interval): Promise<void> {
    const note1 = MIDI_NOTE_NAMES[MIDI_VALUES[note]];
    const note2 = MIDI_NOTE_NAMES[MIDI_VALUES[note] + semitones(interval)];

    Player.synth1?.triggerAttackRelease(note1, NOTE_TIME_IN_SECONDS);
    await this.wait(NOTE_TIME_IN_SECONDS);
    Player.synth2?.triggerAttackRelease(note2, NOTE_TIME_IN_SECONDS);
  }

  playNote(note: Note) {
    Player.synth1?.triggerAttackRelease(MIDI_NOTE_NAMES[MIDI_VALUES[note]], NOTE_TIME_IN_SECONDS);
  }

  async testSound() {
    const TEST_DURATION = NOTE_TIME_IN_SECONDS / 4;

    Player.synth1?.triggerAttackRelease(MIDI_NOTE_NAMES[MIDI_VALUES['C']], TEST_DURATION);
    await this.wait(TEST_DURATION * 2);
    Player.synth2?.triggerAttackRelease(MIDI_NOTE_NAMES[MIDI_VALUES['C']], TEST_DURATION);
    await this.wait(TEST_DURATION * 2);
    Player.synth3?.triggerAttackRelease(MIDI_NOTE_NAMES[MIDI_VALUES['C']], TEST_DURATION);
    await this.wait(TEST_DURATION * 2);
    Player.synth4?.triggerAttackRelease(MIDI_NOTE_NAMES[MIDI_VALUES['C']], TEST_DURATION);

    await this.wait(NOTE_TIME_IN_SECONDS);

    for (let value of Object.values(MIDI_VALUES)) {
      console.log('TEST SOUND', 'now playing', value, MIDI_NOTE_NAMES[value]);
      Player.synth1?.triggerAttackRelease(MIDI_NOTE_NAMES[value], TEST_DURATION);
      await this.wait(TEST_DURATION);
    }
  }

  private async wait(sec: number) {
    return new Promise((resolve) => setTimeout(resolve, sec * 1000));
  }

  async playChord(chord: Chord) {
    const interval1Value = semitones(chord[1]);
    const interval2Value = semitones(chord[2]);
    const rootNoteValue = MIDI_VALUES[chord[0]];

    const note1 = MIDI_NOTE_NAMES[rootNoteValue];
    const note2 = MIDI_NOTE_NAMES[rootNoteValue + interval1Value];
    const note3 = MIDI_NOTE_NAMES[rootNoteValue + interval1Value + interval2Value];
    let note4 = undefined;
    let note5 = undefined;

    if (chord[3]) {
      const interval3Value = semitones(chord[3]);
      note4 = MIDI_NOTE_NAMES[rootNoteValue + interval1Value + interval2Value + interval3Value];

      if (chord[4]) {
        const interval4Value = semitones(chord[4]);
        note5 = MIDI_NOTE_NAMES[rootNoteValue + interval1Value + interval2Value + interval3Value + interval4Value];
      }
    }

    Player.synth1?.triggerAttackRelease(note1, NOTE_TIME_IN_SECONDS);
    await this.wait(0.1);
    Player.synth2?.triggerAttackRelease(note2, NOTE_TIME_IN_SECONDS);
    await this.wait(0.1);
    Player.synth3?.triggerAttackRelease(note3, NOTE_TIME_IN_SECONDS);

    if (note4) {
      await this.wait(0.1);
      Player.synth4?.triggerAttackRelease(note4, NOTE_TIME_IN_SECONDS);
    }

    if (note5) {
      await this.wait(0.1);
      Player.synth5?.triggerAttackRelease(note5, NOTE_TIME_IN_SECONDS);
    }
  }
}

export const player = new Player();

export const PlayerContext = createContext(player);

export function usePlayer() {
  return useContext(PlayerContext);
}
