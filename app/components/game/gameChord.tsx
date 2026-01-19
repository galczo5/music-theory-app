import type { Chord } from '~/types/chord';
import { chordName } from '~/music/chord';
import { usePlayer } from '~/components/midi-player/player';
import { Card, CardContent, CardHeader } from '~/components/ui/card';
import { Separator } from '~/components/ui/separator';

type GameChordProps = {
  chord: Chord;
};

export const GameChord = ({ chord }: GameChordProps) => {
  const player = usePlayer();
  return (
    <div className="flex items-center gap-6 cursor-pointer p-4 text-center" onClick={() => player.playChord(chord)}>
      <Card className="min-w-48 px-6">
        <CardHeader>
          <span className="text-primary pt-2 text-6xl font-bold">{chordName(chord, 'note')}</span>
        </CardHeader>
        <Separator />
        <CardContent>
          <span className="font-bold text-xl">{chordName(chord, 'type')}</span>
        </CardContent>
      </Card>
    </div>
  );
};
