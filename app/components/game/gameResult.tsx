import type { Result } from '~/types/game';
import { Button } from '~/components/ui/button';
import { ArrowRight, Flame, HeartCrack } from 'lucide-react';
import { Item, ItemActions, ItemContent, ItemMedia, ItemTitle } from '~/components/ui/item';

type GameResultProps = {
  result: Result;
  onContinue: () => void;
};

export const GameResult = ({ result, onContinue }: GameResultProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-3 p-4">
      <Item variant="outline">
        <ItemMedia variant="icon">
          {result.result && <Flame />}
          {!result.result && <HeartCrack />}
        </ItemMedia>
        <ItemContent>
          <ItemTitle>
            {result.result ? 'Correct' : 'Mistake'} - {result.description}
          </ItemTitle>
        </ItemContent>
        <ItemActions>
          <Button variant="outline" onClick={onContinue}>
            Continue
            <ArrowRight />
          </Button>
        </ItemActions>
      </Item>
    </div>
  );
};
