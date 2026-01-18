import { Note } from '~/music/notes';
import { Play } from 'lucide-react';
import { Button } from '~/components/ui/button';
import { usePlayer } from '~/components/midi-player/player';
import { Interval } from '~/music/interval';
import type { Chord } from '~/types/chord';

type PlayerButtonProps = {
  note?: Note;
  interval?: [Note, Interval];
  chord?: Chord;
};

export const PlayerButton = ({ note, interval, chord }: PlayerButtonProps) => {
  const player = usePlayer();

  const play = () => {
    if (note) {
      player.playNote(note);
    } else if (interval) {
      player.playInterval(interval[0], interval[1]);
    } else if (chord) {
      player.playChord(chord);
    }
  };

  return (
    <Button className="cursor-pointer" onClick={play}>
      <Play />
      Click here to play sounds
    </Button>
  );
};
