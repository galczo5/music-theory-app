import type { Result } from '~/types/game';
import { Button } from '~/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { TypographyH1, TypographyH3 } from '~/components/ui/typography';
import { usePlayer } from '~/components/midi-player/player';
import { useEffect, useRef } from 'react';
import type { DiminishedChord, MajorChord } from '~/types/chord';
import { Note } from '~/music/notes';
import { Interval } from '~/music/interval';

type GameResultProps = {
  result: Result;
  onContinue: () => void;
};

export const GameResult = ({ result, onContinue }: GameResultProps) => {
  const initialized = useRef(false);
  const player = usePlayer();

  useEffect(() => {
    if (initialized.current) {
      return;
    }

    initialized.current = true;

    const chord = result.result
      ? ([Note.F, Interval.MajorThird, Interval.MinorThird] as MajorChord)
      : ([Note.C, Interval.MinorThird, Interval.MinorThird] as DiminishedChord);

    player.playChord(chord, result.result ? 0 : -1);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center gap-3 p-4 text-center">
      <TypographyH1>{result.result ? 'Correct' : 'Mistake'}</TypographyH1>
      {result.description && <TypographyH3>{result.description}</TypographyH3>}
      <Button variant="outline" className="mt-3" onClick={onContinue}>
        Continue
        <ArrowRight />
      </Button>
    </div>
  );
};
