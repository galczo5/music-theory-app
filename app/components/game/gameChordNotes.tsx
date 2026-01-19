import type { Chord } from '~/types/chord';
import { chordNotes } from '~/music/chord';
import { Card, CardContent } from '~/components/ui/card';
import { Dot } from 'lucide-react';
import { usePlayer } from '~/components/midi-player/player';

type GameChordNotesProps = {
  chord: Chord;
};

export const GameChordNotes = ({ chord }: GameChordNotesProps) => {
  const notes = chordNotes(chord);
  const player = usePlayer();
  return (
    <div className="flex items-center text-center">
      <Card onClick={() => player.playChord(chord)}>
        <CardContent className="flex items-center font-bold text-3xl">
          {notes.map((note, index) => (
            <>
              <span>{note}</span>
              {index !== notes.length - 1 && <Dot />}
            </>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};
