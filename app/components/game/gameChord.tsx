import type { Chord } from '~/types/chord';
import { chordName } from '~/music/chord';

type GameChordProps = {
  chord: Chord;
};

export const GameChord = ({ chord }: GameChordProps) => {
  return (
    <div>
      <span className="text-6xl font-bold text-primary">{chordName(chord)}</span>
    </div>
  );
};
