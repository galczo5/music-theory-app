import { type Game, getGameIcon } from '~/types/game';
import { ArrowRight } from 'lucide-react';
import { Button } from '~/components/ui/button';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '~/components/ui/card';
import { useNavigate } from 'react-router';

type GameCardProp = {
  game: Game;
};

export const GameCard = ({ game }: GameCardProp) => {
  const navigate = useNavigate();
  const disabledStyle = game.disabled ? 'grayscale select-none' : '';
  return (
    <Card className={`w-full ${disabledStyle}`}>
      <CardHeader>
        <div className="flex gap-3 items-center">
          {getGameIcon(game)}
          <CardTitle>{game.name}</CardTitle>
        </div>
        <CardDescription>{game.description}</CardDescription>
      </CardHeader>
      <CardFooter>
        <Button onClick={() => navigate(game.path)} disabled={game.disabled}>
          {game.disabled ? 'Available soon' : 'Play'}
          <ArrowRight />
        </Button>
      </CardFooter>
    </Card>
  );
};
