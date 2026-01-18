import type { Chord } from '~/types/chord';
import { chordName } from '~/music/chord';
import { usePlayer } from '~/components/midi-player/player';

type GameChordProps = {
  chord: Chord;
};

export const GameChord = ({ chord }: GameChordProps) => {
  const player = usePlayer();
  return (
    <div className="flex items-center gap-6 cursor-pointer" onClick={() => player.playChord(chord)}>
      <span className="text-6xl font-bold text-primary">{chordName(chord)}</span>
    </div>
  );
};
