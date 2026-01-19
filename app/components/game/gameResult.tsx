import type { Result } from '~/types/game';
import { Button } from '~/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { TypographyH1, TypographyH3 } from '~/components/ui/typography';

type GameResultProps = {
  result: Result;
  onContinue: () => void;
};

export const GameResult = ({ result, onContinue }: GameResultProps) => {
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
