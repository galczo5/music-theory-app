import { type Game, getGameIcon } from '~/types/game';
import { ArrowRight } from 'lucide-react';
import { Button } from '~/components/ui/button';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '~/components/ui/card';

type GameCardProp = {
  game: Game;
};

export const GameCard = ({ game }: GameCardProp) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex gap-3 items-center">
          {getGameIcon(game)}
          <CardTitle>{game.name}</CardTitle>
        </div>
        <CardDescription>{game.description}</CardDescription>
      </CardHeader>
      <CardFooter>
        <Button>
          Play
          <ArrowRight />
        </Button>
      </CardFooter>
    </Card>
  );
};
