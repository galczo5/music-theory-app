import { createContext } from 'react';
import { Synth } from 'tone';
import type { Note } from '~/music/notes';

class Player {
  private synth = new Synth().toDestination();

  playNote(note: Note) {
    const freq = note.includes('#') ? `${note[0]}#4` : `${note}4`;
    this.synth.triggerAttackRelease(freq, 0.3);
  }
}

export const player = new Player();

export const PlayerContext = createContext(player);
